import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/payments';
import { Head, Link } from '@inertiajs/react';

interface Payment {
    id: number;
    doctor: string | null;
    patient: string | null;
    prescription_code: string;
    amount: number;
    method: string | null;
    status: string | null;
    paid_at: string | null;
    created_at: string | null;
}

interface Props {
    payment: Payment;
}

const PaymentShow = ({ payment }: Props) => {
    const breadcrumbsData = [
        {
            title: 'Payments',
            href: index().url,
        },
        {
            title: 'Payment Details',
            href: show(payment.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Payment #${payment.id}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Payment Details
                </h2>

                <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                    <div className="grid gap-5">
                        <div>
                            <Label>Prescription Code</Label>
                            <p>{payment.prescription_code ?? 'N/A'}</p>
                        </div>

                        <div>
                            <Label>Doctor</Label>
                            <p>{payment.doctor ?? 'N/A'}</p>
                        </div>

                        <div>
                            <Label>Patient</Label>
                            <p>{payment.patient ?? 'N/A'}</p>
                        </div>

                        <div>
                            <Label>Amount</Label>
                            <p>{payment.amount}</p>
                        </div>

                        <div>
                            <Label>Method</Label>
                            <p>{payment.method ?? 'N/A'}</p>
                        </div>

                        <div>
                            <Label>Status</Label>
                            <p>{payment.status ?? 'N/A'}</p>
                        </div>

                        <div>
                            <Label>Paid At</Label>
                            <p>{payment.paid_at ?? 'Not Paid Yet'}</p>
                        </div>

                        <div>
                            <Label>Created At</Label>
                            <p>{payment.created_at}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-2">
                    <Link href={index().url}>
                        <Button
                            variant="secondary"
                            className="cursor-pointer px-6"
                        >
                            Back
                        </Button>
                    </Link>

                    <Link href={edit(payment).url}>
                        <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                            Edit Payment
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default PaymentShow;
