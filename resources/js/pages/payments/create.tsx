import PaymentController from '@/actions/App/Http/Controllers/PaymentController';
import PaymentForm from '@/components/payments/payment-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/prescriptions';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    prescriptions: {
        id: number;
        code: string;
        consultation_fee: number;
    }[];
}

const PaymentCreate = (props: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        prescription_id: '',
        amount: '',
        method: '',
        status: 'pending',
        paid_at: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(PaymentController.store.url());
    };

    const breadcrumbsData = [
        {
            title: 'Payments',
            href: index().url,
        },
        {
            title: 'Create Payment',
            href: create().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Payment" />

            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-4xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Prescription
                </h2>

                <PaymentForm
                    {...props}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default PaymentCreate;
