import MedicineController from '@/actions/App/Http/Controllers/MedicineController';
import MedicineForm from '@/components/medicine/medicine-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/medicines';
import { MedForm, Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    form_ids: number[];
}

interface Props {
    medicineGroups: MedicineGroup[];
    medForms: MedForm[];
}

const MedicineCreate = ({ medicineGroups, medForms }: Props) => {
    const { data, setData, post, processing, errors } = useForm<MedicineProps>({
        id: 0,
        name: '',
        form_ids: [],
        strength: '',
        medicine_group_id: 0,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(MedicineController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Medicines', href: index().url },
        { title: 'Create Medicine', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Medicine" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Medicine
                </h2>

                <MedicineForm
                    medicineGroups={medicineGroups}
                    medForms={medForms}
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

export default MedicineCreate;
