import DegreeController from '@/actions/App/Http/Controllers/DegreeController';
import DegreeForm from '@/components/degrees/degree-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/degrees';
import { Degree } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const DegreeCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Degree>({
        id: 0,
        name: '',
        locale_name: '',
        abbreviation: '',
        locale_abbreviation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(DegreeController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Degrees', href: index().url },
        { title: 'Create Degree', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Degree" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Degree
                </h2>

                <DegreeForm
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

export default DegreeCreate;
