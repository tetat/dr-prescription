import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { index, create, show, edit, destroy } from '@/routes/prescriptions';
import type { BreadcrumbItem } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import TableSearch from '@/components/table-search';
import { Paginate } from '@/components/paginate';
import { useFlashToast } from '@/hooks/use-flash-toast';
import TableActions from '@/components/table-actions';
import TableActionModal from '@/components/table-action-modal';

interface Prescription {
    id: number;
    code: string;
    doctor: string;
    patient: string;
    hospital: string;
    next_visit: string;
}

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface Props {
    prescriptions: {
        data: Prescription[];
        links: LinkProps[];
        from: number;
        to: number;
        total: number;
    };
    filters: FilterProps;
}

const PrescriptionIndex = ({ prescriptions, filters }: Props) => {
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Prescriptions',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescriptions" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-between">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Prescriptions"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Prescription
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of prescriptions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Hospital</TableHead>
                                <TableHead>Next Visit</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {prescriptions.data.length > 0 ? (
                                prescriptions.data.map((prescription, i) => (
                                    <TableRow key={prescription.id}>
                                        <TableCell className="font-medium">
                                            {prescriptions.from + i}
                                        </TableCell>

                                        <TableCell>
                                            {prescription.code}
                                        </TableCell>

                                        <TableCell>
                                            {prescription.patient}
                                        </TableCell>

                                        <TableCell>
                                            {prescription.doctor}
                                        </TableCell>

                                        <TableCell>
                                            {prescription.hospital}
                                        </TableCell>

                                        <TableCell>
                                            {prescription.next_visit}
                                        </TableCell>

                                        <TableCell className="flex items-center justify-end gap-2">
                                            <TableActionModal
                                                show={show(prescription.id).url}
                                                edit={edit(prescription.id).url}
                                                destroy={
                                                    destroy(prescription.id).url
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        No prescriptions found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <Paginate
                        links={prescriptions.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default PrescriptionIndex;
