import MedFormController from '@/actions/App/Http/Controllers/MedFormController';
import MedformForm from '@/components/medicines/medform-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/med-forms';
import { MedForm } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const MedFormCreate = () => {
    const { data, setData, post, processing, errors } = useForm<MedForm>({
        id: 0,
        short_name: '',
        long_name: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(MedFormController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Medicine Forms', href: index().url },
        { title: 'Create Medicine Form', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Medicine Form" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Medicine Form
                </h2>

                <MedformForm
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

export default MedFormCreate;
