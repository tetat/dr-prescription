import HospitalController from '@/actions/App/Http/Controllers/HospitalController';
import HospitalForm from '@/components/hospitals/hospital-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/hospitals';
import { Hospital, Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface HospitalProps extends Hospital {
    logo: File | null;
    phones: Phone[];
}

const HospitalCreate = () => {
    const { data, setData, post, processing, errors } = useForm<HospitalProps>({
        id: 0,
        name: '',
        locale_name: '',
        full_name: '',
        locale_full_name: '',
        logo: null,
        moto: '',
        locale_moto: '',
        address: '',
        locale_address: '',
        phones: [{ country_code: '+880', number: '' }],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(HospitalController.store.url(), {
            forceFormData: true,
        });
    };

    const breadcrumbsData = [
        { title: 'Manage Hospitals', href: index().url },
        { title: 'Create Hospital', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Hospital" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Hospital
                </h2>

                <HospitalForm
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

export default HospitalCreate;
