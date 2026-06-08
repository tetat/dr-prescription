import DegreeController from '@/actions/App/Http/Controllers/DegreeController';
import DegreeForm from '@/components/degrees/degree-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/degrees';
import { Degree } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const DegreeEdit = ({ degree }: { degree: Degree }) => {
    const { data, setData, put, processing, errors } = useForm<Degree>({
        id: degree.id,
        name: degree.name,
        locale_name: degree.locale_name ?? '',
        abbreviation: degree.abbreviation,
        locale_abbreviation: degree.locale_abbreviation ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(DegreeController.update.url(degree.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Degrees', href: index().url },
        { title: 'Edit Degree', href: edit(degree.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Degree" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Degree
                </h2>

                <DegreeForm
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

export default DegreeEdit;
