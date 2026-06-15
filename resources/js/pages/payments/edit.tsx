import PaymentController from '@/actions/App/Http/Controllers/PaymentController';
import PaymentForm from '@/components/payments/payment-form';
import AppLayout from '@/layouts/app-layout';
import { index, edit } from '@/routes/payments';
import { Head, useForm } from '@inertiajs/react';

interface Prescription {
    id: number;
    code: string;
    consultation_fee: number;
}

interface Payment {
    id: number;
    prescription_id: number;
    amount: number;
    method: string;
    status: string;
    paid_at: string | null;
}

interface Props {
    payment: Payment;
    prescriptions: Prescription[];
}

const PaymentEdit = ({ payment, prescriptions }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        prescription_id: payment.prescription_id.toString(),
        amount: payment.amount.toString(),
        method: payment.method,
        status: payment.status,
        paid_at: payment.paid_at ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(PaymentController.update(payment.id).url);
    };

    const breadcrumbsData = [
        {
            title: 'Payments',
            href: index().url,
        },
        {
            title: 'Edit Payment',
            href: edit(payment.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Payment" />

            <div className="mx-auto mt-6 w-4xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Payment
                </h2>

                <PaymentForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    prescriptions={prescriptions}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default PaymentEdit;
