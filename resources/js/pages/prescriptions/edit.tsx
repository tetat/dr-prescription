import PrescriptionController from '@/actions/App/Http/Controllers/PrescriptionController';
import DoseSelector from '@/components/dose-selector';
import InputError from '@/components/input-error';
import MedicineSelector from '@/components/medicine-selector';
import MultiSelect from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import AppLayout from '@/layouts/app-layout';

import { edit, index } from '@/routes/prescriptions';
import {
    MedicineSelectOption,
    MedicineWithPMPivot,
    PrescriptionEditProps,
    SelectOption,
} from '@/types';

import { Head, useForm } from '@inertiajs/react';

interface MedicineFormItem {
    medicine_id: string;
    duration: string;
    duration_type: string;
    doses: number[];
    instructions: string;
}

interface PrescriptionForm {
    doctor_id: string;
    patient_id: string;
    hospital_id: string;

    chief_complaint: string;

    patient_weight: string;
    patient_height: string;

    consultation_fee: string;
    next_visit: string;

    medicines: MedicineFormItem[];
    test_ids: string[];
    examination_ids: string[];
}

interface Props {
    prescription: PrescriptionEditProps;
    doctors: SelectOption[];
    patients: SelectOption[];
    hospitals: SelectOption[];
    medicines: MedicineSelectOption[];
    tests: SelectOption[];
    examinations: SelectOption[];
}

const PrescriptionEdit = ({
    prescription,
    doctors,
    patients,
    hospitals,
    medicines,
    tests,
    examinations,
}: Props) => {
    const { data, setData, put, processing, errors } =
        useForm<PrescriptionForm>({
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

    const addMedicine = () => {
        setData('medicines', [
            ...data.medicines,
            {
                medicine_id: '',
                duration: '7',
                duration_type: 'Day',
                doses: [1, 1, 1],
                instructions: '',
            },
        ]);
    };

    const updateMedicine = (index: number, key: string, value: any) => {
        const updated = [...data.medicines];
        updated[index] = { ...updated[index], [key]: value };
        setData('medicines', updated);
    };

    const removeMedicine = (index: number) => {
        const updated = data.medicines.filter((_, i) => i !== index);
        setData('medicines', updated);
    };

    const getMedicineError = (index: number, field: string) => {
        return (errors as any)[`medicines.${index}.${field}`];
    };

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

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                    {/* Doctor */}
                    <div>
                        <Label>
                            Doctor <span className="ml-1 text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.doctor_id}
                            onValueChange={(value) =>
                                setData('doctor_id', value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>

                            <SelectContent>
                                {doctors.map((doctor) => (
                                    <SelectItem
                                        key={doctor.id}
                                        value={doctor.id.toString()}
                                    >
                                        {doctor.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.doctor_id} />
                    </div>

                    {/* Patient */}
                    <div>
                        <Label>
                            Patient <span className="ml-1 text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.patient_id}
                            onValueChange={(value) =>
                                setData('patient_id', value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Patient" />
                            </SelectTrigger>

                            <SelectContent>
                                {patients.map((patient) => (
                                    <SelectItem
                                        key={patient.id}
                                        value={patient.id.toString()}
                                    >
                                        {patient.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.patient_id} />
                    </div>

                    {/* Hospital */}
                    <div className="md:col-span-2">
                        <Label>
                            Hospital{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.hospital_id}
                            onValueChange={(value) =>
                                setData('hospital_id', value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Hospital" />
                            </SelectTrigger>

                            <SelectContent>
                                {hospitals.map((hospital) => (
                                    <SelectItem
                                        key={hospital.id}
                                        value={hospital.id.toString()}
                                    >
                                        {hospital.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.hospital_id} />
                    </div>

                    {/* Chief Complaint */}
                    <div className="md:col-span-2">
                        <Label>
                            Chief Complaint{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>

                        <Textarea
                            rows={4}
                            value={data.chief_complaint}
                            onChange={(e) =>
                                setData('chief_complaint', e.target.value)
                            }
                            placeholder="Write patient's complaints..."
                        />

                        <InputError message={errors.chief_complaint} />
                    </div>

                    {/* Weight */}
                    <div>
                        <Label>Patient Weight (kg)</Label>

                        <Input
                            type="number"
                            value={data.patient_weight}
                            onChange={(e) =>
                                setData('patient_weight', e.target.value)
                            }
                            placeholder="e.g. 70"
                        />

                        <InputError message={errors.patient_weight} />
                    </div>

                    {/* Height */}
                    <div>
                        <Label>Patient Height (in)</Label>

                        <Input
                            type="number"
                            value={data.patient_height}
                            onChange={(e) =>
                                setData('patient_height', e.target.value)
                            }
                            placeholder="e.g. 67"
                        />

                        <InputError message={errors.patient_height} />
                    </div>

                    {/* Consultation Fee */}
                    <div>
                        <Label>Consultation Fee</Label>

                        <Input
                            type="number"
                            value={data.consultation_fee}
                            onChange={(e) =>
                                setData('consultation_fee', e.target.value)
                            }
                            placeholder="e.g. 500"
                        />

                        <InputError message={errors.consultation_fee} />
                    </div>

                    {/* Next Visit */}
                    <div>
                        <Label>Next Visit (Days)</Label>

                        <Input
                            type="number"
                            value={data.next_visit}
                            onChange={(e) =>
                                setData('next_visit', e.target.value)
                            }
                            placeholder="e.g. 7"
                            min={0}
                        />

                        <InputError message={errors.next_visit} />
                    </div>

                    {/* Tests */}
                    <div>
                        <Label>Tests</Label>

                        <MultiSelect
                            options={tests}
                            value={data.test_ids}
                            onChange={(value) => setData('test_ids', value)}
                            label="Select Tests"
                            getOptionValue={(test) => test.id.toString()}
                            getOptionLabel={(test) => test.name}
                        />

                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('test_ids'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>

                    {/* Examinations */}
                    <div>
                        <Label>Examinations</Label>

                        <MultiSelect
                            options={examinations}
                            value={data.examination_ids}
                            onChange={(value) =>
                                setData('examination_ids', value)
                            }
                            label="Select Examinations"
                            getOptionValue={(exam) => exam.id.toString()}
                            getOptionLabel={(exam) => exam.name}
                        />

                        {Object.entries(errors)
                            .filter(([key]) =>
                                key.startsWith('examination_ids'),
                            )
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>

                    {/* Medicines */}
                    <div className="space-y-4 md:col-span-2">
                        <Label>Medicines</Label>

                        {data.medicines.map((med, index) => (
                            <div
                                key={index}
                                className="space-y-3 rounded-lg border p-4"
                            >
                                {/* Medicine + Duration */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                                    {/* Medicine - 70% */}
                                    <div className="space-y-1 md:col-span-9">
                                        <MedicineSelector
                                            medicines={medicines}
                                            value={med.medicine_id}
                                            onChange={(value) =>
                                                updateMedicine(
                                                    index,
                                                    'medicine_id',
                                                    value,
                                                )
                                            }
                                            error={getMedicineError(
                                                index,
                                                'medicine_id',
                                            )}
                                        />
                                    </div>

                                    {/* Duration - 30% */}
                                    <div className="space-y-1 md:col-span-3">
                                        <Label>Duration</Label>

                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                placeholder="5"
                                                value={med.duration}
                                                onChange={(e) =>
                                                    updateMedicine(
                                                        index,
                                                        'duration',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-1/2"
                                            />

                                            <Select
                                                value={med.duration_type}
                                                onValueChange={(value) =>
                                                    updateMedicine(
                                                        index,
                                                        'duration_type',
                                                        value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-1/2">
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Day">
                                                        Day
                                                    </SelectItem>
                                                    <SelectItem value="Week">
                                                        Week
                                                    </SelectItem>
                                                    <SelectItem value="Month">
                                                        Month
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <InputError
                                            message={getMedicineError(
                                                index,
                                                'duration',
                                            )}
                                        />
                                        <InputError
                                            message={getMedicineError(
                                                index,
                                                'duration_type',
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Dosage Schedule */}
                                <DoseSelector
                                    label="Dosage Schedule"
                                    value={med.doses}
                                    onChange={(value) =>
                                        updateMedicine(index, 'doses', value)
                                    }
                                />
                                <InputError
                                    message={getMedicineError(index, 'doses')}
                                />

                                {/* Instructions */}
                                <div className="space-y-2">
                                    <Label>Instructions</Label>

                                    <Textarea
                                        placeholder="Write instructions..."
                                        value={med.instructions}
                                        onChange={(e) =>
                                            updateMedicine(
                                                index,
                                                'instructions',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={getMedicineError(
                                            index,
                                            'instructions',
                                        )}
                                    />
                                </div>

                                {/* Remove */}
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={data.medicines.length === 1}
                                    onClick={() => removeMedicine(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}

                        {/* Add Medicine */}
                        <Button
                            type="button"
                            className="bg-gray-700 text-white"
                            onClick={addMedicine}
                        >
                            Add Medicine
                        </Button>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 md:col-span-2"
                    >
                        {processing ? 'Updating...' : 'Update Prescription'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PrescriptionEdit;
