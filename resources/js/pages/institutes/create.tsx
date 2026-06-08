import InstituteController from '@/actions/App/Http/Controllers/InstituteController';
import InstituteForm from '@/components/institutes/institute-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/institutes';
import { Institute } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const InstituteCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Institute>({
        id: 0,
        name: '',
        locale_name: '',
        abbreviation: '',
        locale_abbreviation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(InstituteController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Institutes', href: index().url },
        { title: 'Create Institute', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Institute" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Institute
                </h2>

                <InstituteForm
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

export default InstituteCreate;
