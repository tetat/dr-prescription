import ExaminationController from '@/actions/App/Http/Controllers/ExaminationController';
import ExaminationForm from '@/components/examinations/examination-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/examinations';
import { Examination } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const ExaminationCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Examination>({
        id: 0,
        name: '',
        abbreviation: '',
        unit: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ExaminationController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Examinations', href: index().url },
        { title: 'Create Examination', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Examination" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Examination
                </h2>

                <ExaminationForm
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

export default ExaminationCreate;
