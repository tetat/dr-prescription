import DoctorProfileController from '@/actions/App/Http/Controllers/DoctorProfileController';
import DoctorForm from '@/components/doctors/doctor-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/doctors';
import { DoctorProps, Role, SelectOption } from '@/types';

import { Head, useForm } from '@inertiajs/react';

interface Props {
    doctor: DoctorProps;
    degrees: SelectOption[];
    institutes: SelectOption[];
    specialities: SelectOption[];
    roles: Role[];
}

const DoctorEdit = ({
    doctor,
    degrees,
    institutes,
    specialities,
    roles,
}: Props) => {
    const { data, setData, put, processing, errors } = useForm<DoctorProps>({
        ...doctor,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(DoctorProfileController.update.url(doctor.id));
    };

    const breadcrumbsData = [
        {
            title: 'Manage Doctors',
            href: index().url,
        },
        {
            title: 'Edit Doctor',
            href: edit(doctor.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Edit ${doctor.name}`} />

            <div className="mx-auto mt-6 w-3xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Doctor
                </h2>

                <DoctorForm
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    degrees={degrees}
                    institutes={institutes}
                    specialities={specialities}
                    roles={roles}
                    onSubmit={onSubmit}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default DoctorEdit;
