import MedFormController from '@/actions/App/Http/Controllers/MedFormController';
import MedformForm from '@/components/medicine/medform-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/med-forms';
import { MedForm } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const MedFormEdit = ({ medForm }: { medForm: MedForm }) => {
    const { data, setData, put, processing, errors } = useForm<MedForm>({
        id: medForm.id,
        short_name: medForm.short_name,
        long_name: medForm.long_name,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedFormController.update.url(medForm.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Medicine Forms', href: index().url },
        { title: 'Edit Medicine Form', href: edit(medForm.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Medicine Form" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Medicine Form
                </h2>

                <MedformForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default MedFormEdit;
