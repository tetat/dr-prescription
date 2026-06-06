import PatientController from '@/actions/App/Http/Controllers/PatientController';
import PatientForm from '@/components/patients/patient-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/patients';
import { PatientProps, Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const PatientCreate = () => {
    const { data, setData, post, processing, errors } = useForm<PatientProps>({
        id: 0,
        name: '',
        email: '',
        gender: '',
        age: 18,
        age_type: 'Years',
        blood_group: '',
        address: '',
        phones: [
            {
                country_code: '+880',
                number: '',
            },
        ],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(PatientController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Patients', href: index().url },
        { title: 'Create Patient', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Patient" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Patient
                </h2>

                <PatientForm
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

export default PatientCreate;
