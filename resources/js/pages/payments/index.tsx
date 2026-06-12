import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/payments';
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

interface Payment {
    id: number;
    doctor: string | null;
    patient: string | null;
    hospital: string | null;
    amount: number;
    method: string | null;
    status: string | null;
    paid_at: string | null;
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
    payments: {
        data: Payment[];
        links: LinkProps[];
        from: number;
        to: number;
        total: number;
    };
    filters: FilterProps;
}

const PaymentIndex = ({ payments, filters }: Props) => {
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

        router.get(index().url, queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Payments',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />

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
                                    Create Payment
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <Table>
                        <TableCaption>A list of payments.</TableCaption>

                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Hospital</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Paid At</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {payments.data.length > 0 ? (
                                payments.data.map((payment, i) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">
                                            {payments.from + i}
                                        </TableCell>

                                        <TableCell>{payment.patient}</TableCell>
                                        <TableCell>{payment.doctor}</TableCell>
                                        <TableCell>
                                            {payment.hospital}
                                        </TableCell>

                                        <TableCell>{payment.amount}</TableCell>

                                        <TableCell>{payment.method}</TableCell>

                                        <TableCell>{payment.status}</TableCell>

                                        <TableCell>{payment.paid_at}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center"
                                    >
                                        No payments found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <Paginate
                        links={payments.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default PaymentIndex;
