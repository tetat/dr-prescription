import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/MedicineController';
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
import { create, index } from '@/routes/medicines';
import { MedForm, Medicine } from '@/types';
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

interface MedicineProps extends Medicine {
    group_name: string;
    medForms: MedForm[];
}

interface MedicinePagination {
    data: MedicineProps[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    medicines: MedicinePagination;
    filters: FilterProps;
}

const MedicineIndex = ({ medicines, filters }: IndexProps) => {
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
            title: 'Manage Medicines',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Medicine Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Medicines"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Medicine
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of medicines.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Brand Name</TableHead>
                                <TableHead>Generic Name</TableHead>
                                <TableHead>Form</TableHead>
                                <TableHead>Strength</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medicines.data.length > 0 ? (
                                medicines.data?.map((medicine, index) => (
                                    <TableRow key={medicine.id}>
                                        <TableCell className="font-medium">
                                            {index + medicines.from}
                                        </TableCell>
                                        <TableCell>{medicine.name}</TableCell>
                                        <TableCell>
                                            {medicine.group_name}
                                        </TableCell>
                                        <TableCell className="align-middle">
                                            <div className="flex flex-wrap gap-1">
                                                {medicine.medForms.map(
                                                    (medForm) => (
                                                        <span
                                                            key={medForm.id}
                                                            className="rounded bg-gray-200 px-2 py-1 text-xs leading-none"
                                                        >
                                                            {medForm.short_name}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {medicine.strength}
                                        </TableCell>
                                        <TableCell className="flex items-center justify-end gap-2">
                                            <TableActions
                                                show={show(medicine.id).url}
                                                edit={edit(medicine.id).url}
                                                destroy={
                                                    destroy(medicine.id).url
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
                                        No medicines found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={medicines.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default MedicineIndex;
