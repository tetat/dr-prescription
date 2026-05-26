import PrescriptionController from '@/actions/App/Http/Controllers/PrescriptionController';
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

interface PrescriptionForm {
    doctor_id: string;
    patient_id: string;
    hospital_id: string;

    chief_complaint: string;

    patient_weight: string;
    patient_height: string;

    consultation_fee: string;
    next_visit: string;

    medicine_ids: string[];
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

            medicine_ids: [],
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

                    {/* Medicines */}
                    <div className="md:col-span-2">
                        <Label>Medicines</Label>

                        <MultiSelect
                            options={medicines}
                            value={data.medicine_ids}
                            onChange={(value) => setData('medicine_ids', value)}
                            label="Select Medicines"
                            getOptionValue={(medicine) =>
                                medicine.id.toString()
                            }
                            getOptionLabel={(medicine) => medicine.name}
                        />

                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('medicine_ids'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
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
