import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/SpecialityController';
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
import { create, index } from '@/routes/specialities';
import { Speciality } from '@/types';
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

interface SpecialityPagination {
    data: Speciality[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    specialities: SpecialityPagination;
    filters: FilterProps;
}

const SpecialityIndex = ({ specialities, filters }: IndexProps) => {
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
            title: 'Manage Specialities',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Speciality Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Specialities"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Speciality
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of specialities.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Local Name</TableHead>
                                <TableHead>Abbreviation</TableHead>
                                <TableHead>Local Abbreviation</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {specialities.data.length > 0 ? (
                                specialities.data?.map((speciality, index) => (
                                    <TableRow key={speciality.id}>
                                        <TableCell className="font-medium">
                                            {index + specialities.from}
                                        </TableCell>
                                        <TableCell>{speciality.name}</TableCell>
                                        <TableCell>
                                            {speciality.locale_name}
                                        </TableCell>
                                        <TableCell>
                                            {speciality.abbreviation}
                                        </TableCell>
                                        <TableCell>
                                            {speciality.locale_abbreviation}
                                        </TableCell>
                                        <TableCell className="flex items-center justify-end gap-2">
                                            <TableActions
                                                show={show(speciality.id).url}
                                                edit={edit(speciality.id).url}
                                                destroy={
                                                    destroy(speciality.id).url
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
                                        No specialities found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={specialities.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default SpecialityIndex;
