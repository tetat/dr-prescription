import MedicineController from '@/actions/App/Http/Controllers/MedicineController';
import MedicineForm from '@/components/medicines/medicine-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/medicines';
import { MedForm, Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    group: MedicineGroup;
    forms: MedForm[];
}

interface MedicineFormData extends Medicine {
    form_ids: number[];
}

interface Props {
    medicine: MedicineProps;
    medicineGroups: MedicineGroup[];
    medForms: MedForm[];
}

const MedicineEdit = ({ medicine, medicineGroups, medForms }: Props) => {
    const { data, setData, put, processing, errors } =
        useForm<MedicineFormData>({
            id: medicine.id,
            name: medicine.name,
            form_ids: medicine.forms.map((f) => f.id),
            strength: medicine.strength,
            medicine_group_id: medicine.group.id,
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedicineController.update.url(medicine.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Medicines', href: index().url },
        { title: 'Edit Medicine', href: edit(medicine.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Medicine" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Medicine
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

export default MedicineEdit;
