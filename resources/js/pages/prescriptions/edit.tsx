import PrescriptionController from '@/actions/App/Http/Controllers/PrescriptionController';
import PrescriptionForm from '@/components/prescriptions/prescription-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/prescriptions';
import {
    MedicineSelectOption,
    MedicineWithPMPivot,
    PrescriptionEditProps,
    PrescriptionFormProps,
    SelectOption,
} from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    prescription: PrescriptionEditProps;
    doctors: SelectOption[];
    patients: SelectOption[];
    hospitals: SelectOption[];
    medicines: MedicineSelectOption[];
    tests: SelectOption[];
    examinations: SelectOption[];
}

const PrescriptionEdit = ({ prescription, ...props }: Props) => {
    const { data, setData, put, processing, errors } =
        useForm<PrescriptionFormProps>({
            doctor_id: prescription.doctor_id?.toString() ?? '',
            patient_id: prescription.patient_id?.toString() ?? '',
            hospital_id: prescription.hospital_id?.toString() ?? '',

            chief_complaint: prescription.chief_complaint ?? '',

            patient_weight: prescription.patient_weight?.toString() ?? '',
            patient_height: prescription.patient_height?.toString() ?? '',

            consultation_fee: prescription.consultation_fee?.toString() ?? '',
            next_visit: prescription.next_visit?.toString() ?? '',

            medicines:
                prescription.medicines?.map((m: MedicineWithPMPivot) => ({
                    medicine_id:
                        m.pivot?.medicine_id?.toString() ??
                        m.pivot.medicine_id?.toString() ??
                        '',
                    duration: m.pivot?.duration?.toString() ?? '7',
                    duration_type: m.pivot?.duration_type ?? 'Day',

                    // IMPORTANT FIX: ensure array always
                    doses: Array.isArray(m.pivot?.doses)
                        ? m.pivot.doses
                        : JSON.parse(m.pivot?.doses ?? '[1,1,1]'),

                    instructions: m.pivot?.instructions ?? '',
                })) ?? [],

            test_ids:
                prescription.tests?.map((t: SelectOption) => t.id.toString()) ??
                [],
            examination_ids:
                prescription.examinations?.map((e: SelectOption) =>
                    e.id.toString(),
                ) ?? [],
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(PrescriptionController.update.url(prescription.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Prescriptions', href: index().url },
                { title: 'Edit Prescription', href: edit(prescription.id).url },
            ]}
        >
            <Head title="Edit Prescription" />

            <div className="mx-auto mt-6 w-4xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Prescription
                </h2>

                <PrescriptionForm
                    {...props}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    submitLabel="Update Prescription"
                />
            </div>
        </AppLayout>
    );
};

export default PrescriptionEdit;
