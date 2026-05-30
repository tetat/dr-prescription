import PrescriptionController from '@/actions/App/Http/Controllers/PrescriptionController';
import DoseSelector from '@/components/dose-selector';
import InputError from '@/components/input-error';
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

import { create, index } from '@/routes/prescriptions';

import { Head, useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
}

interface Hospital {
    id: number;
    name: string;
}

interface Medicine {
    id: number;
    name: string;
}

interface Test {
    id: number;
    name: string;
}

interface Examination {
    id: number;
    name: string;
}

interface Props {
    doctors: User[];
    patients: User[];
    hospitals: Hospital[];
    medicines: Medicine[];
    tests: Test[];
    examinations: Examination[];
}

interface MedicineItem {
    medicine_id: string;
    dosage: string;
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

    medicines: MedicineItem[];
    test_ids: string[];
    examination_ids: string[];
}

const PrescriptionCreate = ({
    doctors,
    patients,
    hospitals,
    medicines,
    tests,
    examinations,
}: Props) => {
    const { data, setData, post, processing, errors } =
        useForm<PrescriptionForm>({
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
                    dosage: '',
                    duration: '',
                    duration_type: 'day',
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

    const addMedicine = () => {
        setData('medicines', [
            ...data.medicines,
            {
                medicine_id: '',
                dosage: '',
                duration: '',
                duration_type: 'day',
                doses: [1, 1, 1],
                instructions: '',
            },
        ]);
    };

    const updateMedicine = (index: number, key: string, value: any) => {
        const updated = [...data.medicines];

        updated[index] = {
            ...updated[index],
            [key]: value,
        };

        setData('medicines', updated);
    };

    const removeMedicine = (index: number) => {
        const updated = data.medicines.filter((_, i) => i !== index);
        setData('medicines', updated);
    };

    const toggleDose = (mIndex: number, dIndex: number) => {
        const updated = [...data.medicines];

        const doses = [...updated[mIndex].doses];
        doses[dIndex] = doses[dIndex] ? 0 : 1;

        updated[mIndex].doses = doses;

        setData('medicines', updated);
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
                                {/* Medicine Select - FULL WIDTH */}
                                <Select
                                    value={med.medicine_id}
                                    onValueChange={(value) =>
                                        updateMedicine(
                                            index,
                                            'medicine_id',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Medicine" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {medicines.map((m) => (
                                            <SelectItem
                                                key={m.id}
                                                value={m.id.toString()}
                                            >
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Dosage + Duration ONE LINE (50/50) */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {/* Dosage */}
                                    <div className="space-y-1">
                                        <Label>Dosage</Label>
                                        <Input
                                            placeholder="e.g. 1 tablet"
                                            value={med.dosage}
                                            onChange={(e) =>
                                                updateMedicine(
                                                    index,
                                                    'dosage',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div className="space-y-1">
                                        <Label>Duration</Label>

                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                placeholder="e.g. 5"
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
                                                    <SelectValue placeholder="Unit" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="day">
                                                        Day
                                                    </SelectItem>
                                                    <SelectItem value="week">
                                                        Week
                                                    </SelectItem>
                                                    <SelectItem value="month">
                                                        Month
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Dose Selector */}
                                <DoseSelector
                                    label="Dosage Schedule"
                                    value={med.doses}
                                    onChange={(value) =>
                                        updateMedicine(index, 'doses', value)
                                    }
                                />

                                {/* Instructions */}
                                <div className="space-y-2">
                                    <Label>Instructions</Label>

                                    <Textarea
                                        placeholder="e.g. Take after meal, avoid milk, etc."
                                        value={med.instructions}
                                        onChange={(e) =>
                                            updateMedicine(
                                                index,
                                                'instructions',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>

                                {/* Remove */}
                                <Button
                                    type="button"
                                    variant="destructive"
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
                        {processing ? 'Creating...' : 'Create Prescription'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PrescriptionCreate;
