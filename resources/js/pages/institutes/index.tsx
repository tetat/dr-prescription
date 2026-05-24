import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/InstituteController';
import { Paginate } from '@/components/paginate';
import TableActions from '@/components/table-actions';
import TableSearch from '@/components/table-search';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/institutes';
import { Institute } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface InstitutePagination {
    data: Institute[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    institutes: InstitutePagination;
    filters: FilterProps;
}

const InstitueIndex = ({ institutes, filters }: IndexProps) => {
    useFlashToast();

    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(value && { perPage: value }),
            ...(data.search && { search: data.search }),
        };

        router.get(index(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const breadcrumbsData = [
        {
            title: 'Manage Institutes',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Institute Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Institutes"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Institute
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of institutes.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Abbreviation</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {institutes.data.length > 0 ? (
                                institutes.data?.map((institute, index) => (
                                    <TableRow key={institute.id}>
                                        <TableCell className="font-medium">
                                            {index + institutes.from}
                                        </TableCell>
                                        <TableCell>{institute.name}</TableCell>
                                        <TableCell>{`${institute.abbreviation}${
                                            institute.locale_abbreviation
                                                ? ` (${institute.locale_abbreviation})`
                                                : ''
                                        }`}</TableCell>
                                        <TableCell className="flex items-center justify-end gap-2">
                                            <TableActions
                                                show={show(institute.id).url}
                                                edit={edit(institute.id).url}
                                                destroy={
                                                    destroy(institute.id).url
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No institutes found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={institutes.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default InstitueIndex;
