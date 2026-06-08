import MedicineGroupController from '@/actions/App/Http/Controllers/MedicineGroupController';
import MedicinegroupForm from '@/components/medicine/medicinegroup-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/medicine-groups';
import { MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const MedicineGroupCreate = () => {
    const { data, setData, post, processing, errors } = useForm<MedicineGroup>({
        id: 0,
        name: '',
        description: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(MedicineGroupController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Medicine Groups', href: index().url },
        { title: 'Create Medicine Group', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Medicine Group" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Medicine Group
                </h2>

                <MedicinegroupForm
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={onSubmit}
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default MedicineGroupCreate;
