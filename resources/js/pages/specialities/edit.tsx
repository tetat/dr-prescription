import SpecialityController from '@/actions/App/Http/Controllers/SpecialityController';
import SpecialityForm from '@/components/specialities/speciality-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/specialities';
import { Speciality } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const SpecialityEdit = ({ speciality }: { speciality: Speciality }) => {
    const { data, setData, put, processing, errors } = useForm<Speciality>({
        id: speciality.id,
        name: speciality.name,
        locale_name: speciality.locale_name,
        abbreviation: speciality.abbreviation,
        locale_abbreviation: speciality.locale_abbreviation,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(SpecialityController.update.url(speciality.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Specialities', href: index().url },
        { title: 'Edit Speciality', href: edit(speciality.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Speciality" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Speciality
                </h2>

                <SpecialityForm
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

export default SpecialityEdit;
