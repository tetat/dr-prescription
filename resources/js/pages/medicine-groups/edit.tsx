import MedicineGroupController from '@/actions/App/Http/Controllers/MedicineGroupController';
import MedicinegroupForm from '@/components/medicines/medicinegroup-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/medicine-groups';
import { MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const MedicineGroupEdit = ({
    medicineGroup,
}: {
    medicineGroup: MedicineGroup;
}) => {
    const { data, setData, put, processing, errors } = useForm<MedicineGroup>({
        id: medicineGroup.id,
        name: medicineGroup.name,
        description: medicineGroup.description,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedicineGroupController.update.url(medicineGroup.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Medicine Groups', href: index().url },
        { title: 'Edit Medicine Group', href: edit(medicineGroup.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Test" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Medicine Group
                </h2>

                <MedicinegroupForm
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={onSubmit}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default MedicineGroupEdit;
