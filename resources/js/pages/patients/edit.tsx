import PatientController from '@/actions/App/Http/Controllers/PatientController';
import PatientForm from '@/components/patients/patient-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/patients';
import { PatientProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const PatientEdit = ({ patient }: { patient: PatientProps }) => {
    const { data, setData, put, processing, errors } = useForm<PatientProps>({
        id: patient.id,
        name: patient.name,
        email: patient.email ?? '',
        gender: patient.gender ?? '',
        age: patient.age,
        age_type: patient.age_type,
        blood_group: patient.blood_group ?? '',
        address: patient.address ?? '',
        phones: patient.phones,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(PatientController.update.url(patient.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Patients', href: index().url },
        { title: 'Edit Patient', href: edit(patient.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Patient" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Patient
                </h2>

                <PatientForm
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

export default PatientEdit;
