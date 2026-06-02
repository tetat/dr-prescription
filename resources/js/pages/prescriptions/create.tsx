import PrescriptionController from '@/actions/App/Http/Controllers/PrescriptionController';
import PrescriptionForm from '@/components/prescriptions/prescription-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/prescriptions';
import {
    MedicineSelectOption,
    PrescriptionFormProps,
    SelectOption,
} from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    doctors: SelectOption[];
    patients: SelectOption[];
    hospitals: SelectOption[];
    medicines: MedicineSelectOption[];
    tests: SelectOption[];
    examinations: SelectOption[];
}

const PrescriptionCreate = (props: Props) => {
    const { data, setData, post, processing, errors } =
        useForm<PrescriptionFormProps>({
            doctor_id: '',
            patient_id: '',
            hospital_id: '',

            chief_complaint: '',

            patient_weight: '',
            patient_height: '',

            consultation_fee: '700',
            next_visit: '',

            medicines: [
                {
                    medicine_id: '',
                    duration: '7',
                    duration_type: 'Day',
                    doses: [1, 1, 1],
                    instructions: '',
                },
            ],
            test_ids: [],
            examination_ids: [],
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(PrescriptionController.store.url());
    };

    const breadcrumbsData = [
        {
            title: 'Prescriptions',
            href: index().url,
        },
        {
            title: 'Create Prescription',
            href: create().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Prescription" />

            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-4xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Prescription
                </h2>

                <PrescriptionForm
                    {...props}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    submitLabel="Create Prescription"
                />
            </div>
        </AppLayout>
    );
};

export default PrescriptionCreate;
