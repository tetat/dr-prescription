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
import TableActionModal from '@/components/table-action-modal';
import { useState } from 'react';
import payments from '@/routes/payments';
import PaymentModal from '@/components/payments/payment-modal';
import { toast } from 'sonner';

interface Prescription {
    id: number;
    code: string;
    doctor: string;
    patient: string;
    hospital: string;
    next_visit: string;
    consultation_fee: number;
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
    const {
        data: paymentData,
        setData: setPaymentData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        prescription_id: '',
        amount: '',
        method: '',
        status: 'Pending',
        paid_at: '',
        from: '',
    });

    const [paymentOpen, setPaymentOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] =
        useState<Prescription | null>(null);

    const handlePay = (prescription: Prescription) => {
        const remaining = Number(prescription.consultation_fee);

        if (remaining <= 0) {
            toast.success('Payment already completed.');
            return;
        }

        setSelectedPrescription(prescription);

        setPaymentData({
            prescription_id: prescription.id.toString(),
            amount: prescription.consultation_fee.toString(),
            method: 'Cash',
            status: 'Pending',
            paid_at: '',
            from: 'prescription',
        });

        setPaymentOpen(true);
    };

    const submitPayment = (e: React.FormEvent) => {
        e.preventDefault();

        post(payments.store().url, {
            onSuccess: () => {
                reset();
                setPaymentOpen(false);
            },
        });
    };

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
                                <TableHead>Payment</TableHead>
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

                                        <TableCell>
                                            {Number(
                                                prescription.consultation_fee,
                                            ) <= 0 ? (
                                                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                                                    Due
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell className="flex items-center justify-end gap-2">
                                            <TableActionModal
                                                show={show(prescription.id).url}
                                                edit={edit(prescription.id).url}
                                                onPay={() =>
                                                    handlePay(prescription)
                                                }
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
            <PaymentModal
                key={selectedPrescription?.id || 'new'}
                open={paymentOpen}
                setOpen={setPaymentOpen}
                prescription={selectedPrescription}
                data={paymentData}
                setData={setPaymentData}
                errors={errors}
                processing={processing}
                onSubmit={submitPayment}
            />
        </AppLayout>
    );
};

export default PrescriptionIndex;
