import HospitalController from '@/actions/App/Http/Controllers/HospitalController';
import HospitalForm from '@/components/hospitals/hospital-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/hospitals';
import { Hospital, Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface HospitalProps extends Hospital {
    logo: File | null;
    logo_url: string;
    phones: Phone[];
}

const HospitalEdit = ({ hospital }: { hospital: HospitalProps }) => {
    const { data, setData, put, processing, errors } = useForm<HospitalProps>({
        id: hospital.id,
        name: hospital.name,
        locale_name: hospital.locale_name ?? '',
        full_name: hospital.full_name ?? '',
        locale_full_name: hospital.locale_full_name ?? '',
        logo: null,
        logo_url: hospital.logo_url ?? '',
        moto: hospital.moto ?? '',
        locale_moto: hospital.locale_moto ?? '',
        address: hospital.address ?? '',
        locale_address: hospital.locale_address ?? '',
        phones: [...hospital.phones],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(HospitalController.update.url(hospital.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Hospitals', href: index().url },
        { title: 'Edit Hospital', href: edit(hospital.id).url },
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
                    Edit Hospital
                </h2>

                <HospitalForm
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

export default HospitalEdit;
