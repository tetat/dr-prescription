import InstituteController from '@/actions/App/Http/Controllers/InstituteController';
import InstituteForm from '@/components/institutes/institute-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/institutes';
import { Institute } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const InstituteEdit = ({ institute }: { institute: Institute }) => {
    const { data, setData, put, processing, errors } = useForm<Institute>({
        id: institute.id,
        name: institute.name,
        locale_name: institute.locale_name ?? '',
        abbreviation: institute.abbreviation,
        locale_abbreviation: institute.locale_abbreviation ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(InstituteController.update.url(institute.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Institutes', href: index().url },
        { title: 'Edit Institute', href: edit(institute.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Institute" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Institute
                </h2>

                <InstituteForm
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

export default InstituteEdit;
