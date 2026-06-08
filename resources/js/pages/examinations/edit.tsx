import ExaminationController from '@/actions/App/Http/Controllers/ExaminationController';
import ExaminationForm from '@/components/examinations/examination-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/examinations';
import { Examination } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const ExaminationEdit = ({ examination }: { examination: Examination }) => {
    const { data, setData, put, processing, errors } = useForm<Examination>({
        id: examination.id,
        name: examination.name,
        abbreviation: examination.abbreviation,
        unit: examination.unit,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(ExaminationController.update.url(examination.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Examinations', href: index().url },
        { title: 'Edit Examination', href: edit(examination.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Examination" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Examination
                </h2>

                <ExaminationForm
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

export default ExaminationEdit;
