import DoctorProfileController from '@/actions/App/Http/Controllers/DoctorProfileController';
import DegreeField from '@/components/degree-field';
import InputError from '@/components/input-error';
import MultiSelect from '@/components/multi-select';
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
import { create, index } from '@/routes/doctors';
import { Degree, DoctorProfile, Institute, Phone, Speciality } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface DoctorProps extends DoctorProfile {
    name: string;
    email: string;
    gender: string;
    blood_group?: string;
    address?: string;
    phones: Phone[];
    degrees: {
        degree_id: number | string;
        institute_id: number | string;
        passing_year: string;
    }[];
    speciality_ids: string[];
}

interface Props {
    degrees: Degree[];
    institutes: Institute[];
    specialities: Speciality[];
}

const DoctorCreate = ({ degrees, institutes, specialities }: Props) => {
    const { data, setData, post, processing, errors } = useForm<DoctorProps>({
        name: '',
        email: '',
        gender: '',
        blood_group: '',
        address: '',
        user_id: 0,
        title: 'Dr.',
        licence_no: '',
        bio: '',
        phones: [
            {
                country_code: '+880',
                number: '',
            },
        ],
        degrees: [{
            degree_id: '',
            institute_id: '',
            passing_year: '',
        }],
        speciality_ids: [],
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

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Title */}
                    <div>
                        <Label>Doctor's Title <span className="ml-1 text-red-500">*</span></Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Dr."
                        />
                        <InputError message={errors.title} />
                    </div>

                    {/* Email */}
                    <div>
                        <Label>Email <span className="ml-1 text-red-500">*</span></Label>
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter email"
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

                    {/* Blood Group */}
                    <div>
                        <Label>Blood Group</Label>
                        <Select
                            value={data.blood_group}
                            onValueChange={(value) => setData('blood_group', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Blood Group" />
                            </SelectTrigger>
                            <SelectContent>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                                    (group) => (
                                        <SelectItem key={group} value={group}>
                                            {group}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.blood_group} />
                    </div>



                    {/* Licence */}
                    <div>
                        <Label>
                            Licence Number <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.licence_no}
                            onChange={(e) => setData('licence_no', e.target.value)}
                            placeholder="e.g. A-123456"
                        />
                        <InputError message={errors.licence_no} />
                    </div>

                    {/* Address - full width */}
                    <div>
                        <Label>Address</Label>
                        <Textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter full address"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Bio*/}
                    <div >
                        <Label>Doctor's Bio</Label>
                        <Textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Enter doctor's bio"
                            rows={3}
                        />
                        <InputError message={errors.bio} />
                    </div>


                    {/* Speciality */}
                    <div className="md:col-span-2">
                        <Label>Specialties</Label>
                        <MultiSelect
                            options={specialities}
                            value={data.speciality_ids}
                            onChange={(val) => setData('speciality_ids', val)}
                            label="Select Specialities"
                        />

                        <InputError message={errors.speciality_ids} />
                    </div>

                    {/* Degree */}
                    <div className="md:col-span-2">
                        <Label>
                            Degrees <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <DegreeField
                            degrees={data.degrees}
                            setDegrees={(val) => setData('degrees', val)}
                            degreeOptions={degrees}
                            instituteOptions={institutes}
                        />
                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('degrees'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>



                    {/* Phones - full width */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>
                            Contact Numbers <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <PhoneField
                            phones={data.phones}
                            setPhones={(phones) => setData('phones', phones)}
                        />

                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('phones'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>



                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="md:col-span-2 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        {processing ? 'Creating...' : 'Create Doctor'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default DoctorCreate;
