import SpecialityController from '@/actions/App/Http/Controllers/SpecialityController';
import SpecialityForm from '@/components/specialities/speciality-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/specialities';
import { Speciality } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const SpecialityCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Speciality>({
        id: 0,
        name: '',
        locale_name: '',
        abbreviation: '',
        locale_abbreviation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(SpecialityController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Specialities', href: index().url },
        { title: 'Create Speciality', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Speciality" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Speciality
                </h2>

                <SpecialityForm
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

export default SpecialityCreate;
