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
import { create, index } from '@/routes/patients';
import { Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface PatientProps {
    name: string;
    email: string;
    gender: string;
    dob: string;
    blood_group: string;
    address: string;
    phones: Phone[];
}


const PatientCreate = () => {
    const { data, setData, post, processing, errors } = useForm<PatientProps>({
        name: '',
        email: '',
        gender: '',
        dob: '',
        blood_group: '',
        address: '',
        phones: [
            {
                country_code: '+880',
                number: '',
            },
        ],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(PatientController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Patients', href: index().url },
        { title: 'Create Patient', href: create().url },
    ];

    const typedErrors = errors as Record<string, string>;

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Patient" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Patient
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
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.gender} />
                    </div>

                    {/* DOB */}
                    <div>
                        <Label>
                            Date of Birth{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData('dob', e.target.value)}
                        />
                        <InputError message={errors.dob} />
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
                        Create Patient
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PatientCreate;
