import DoctorProfileController from '@/actions/App/Http/Controllers/DoctorProfileController';
import DoctorForm from '@/components/doctors/doctor-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/doctors';
import { DoctorProps, Role, SelectOption } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    degrees: SelectOption[];
    institutes: SelectOption[];
    specialities: SelectOption[];
    roles: Role[];
}

const DoctorCreate = ({ degrees, institutes, specialities, roles }: Props) => {
    const { data, setData, post, processing, errors } = useForm<DoctorProps>({
        id: 0,
        name: '',
        locale_name: '',
        email: '',
        gender: '',
        blood_group: '',
        address: '',
        user_id: 0,
        title: 'Dr.',
        locale_title: '',
        licence_no: '',
        bio: '',
        phones: [
            {
                country_code: '+880',
                number: '',
            },
        ],
        degrees: [
            {
                degree_id: '',
                institute_id: '',
                passing_year: '',
            },
        ],
        speciality_ids: [],
        role_ids: ['doctor'],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(DoctorProfileController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Doctors', href: index().url },
        { title: 'Create Doctor', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Doctor" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-3xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Doctor
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
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default DoctorCreate;
