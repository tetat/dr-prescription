import PatientController from '@/actions/App/Http/Controllers/PatientController';
import InputError from '@/components/input-error';
import PhoneField from '@/components/phone-field';
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
import { edit, index } from '@/routes/patients';
import { Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface PatientProps {
    id: number;
    name: string;
    email?: string;
    gender: string;
    age: number;
    age_type: string;
    blood_group: string;
    address?: string;
    phones: Phone[];
}

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
    }

    const breadcrumbsData = [
        { title: 'Manage Patients', href: index().url },
        { title: 'Edit Patient', href: edit(patient.id).url },
    ];

    const typedErrors = errors as Record<string, string>;

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

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <Input
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Gender */}
                    <div>
                        <Label>
                            Gender <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.gender}
                            onValueChange={(value) => setData('gender', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.gender} />
                    </div>

                    {/* Age */}
                    <div>
                        <Label>
                            Age <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                value={data.age}
                                onChange={(e) => setData('age', Number(e.target.value))}
                            />
                            <Select
                                value={data.age_type}
                                onValueChange={(value) => setData('age_type', value)}
                            >
                                <SelectTrigger className="w-2/4">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Years">Years</SelectItem>
                                    <SelectItem value="Months">Months</SelectItem>
                                    <SelectItem value="Days">Days</SelectItem>
                                    <SelectItem value="Year">Year</SelectItem>
                                    <SelectItem value="Month">Month</SelectItem>
                                    <SelectItem value="Day">Day</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.age_type} />
                        <InputError message={errors.age} />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <Label>Blood Group</Label>

                        <Select
                            value={data.blood_group}
                            onValueChange={(value) =>
                                setData('blood_group', value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Blood Group" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.blood_group} />
                    </div>

                    {/* Address */}

                    <div>
                        <Label>Address</Label>
                        <Textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter full address"
                            className="w-full"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Phones */}
                    <div className="space-y-2">
                        <Label>
                            Phones <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <PhoneField
                            phones={data.phones}
                            setPhones={(phones) => setData('phones', phones)}
                        />
                        {/* show all phone errors */}
                        {Object.keys(errors)
                            .filter((key) => key.startsWith('phones'))
                            .map((key) => (
                                <InputError
                                    key={key}
                                    message={typedErrors[key]}
                                />
                            ))}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Patient
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PatientEdit;
