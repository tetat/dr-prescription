import { DoctorProfile, Phone, Role, SelectOption } from '@/types';
import DegreeField from '../degree-field';
import InputError from '../input-error';
import MultiSelect from '../multi-select';
import PhoneField from '../phone-field';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface DoctorProps extends DoctorProfile {
    name: string;
    locale_name: string;
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
    role_ids: string[];
}

interface Props {
    data: DoctorProps;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    degrees: SelectOption[];
    institutes: SelectOption[];
    specialities: SelectOption[];
    roles: Role[];
    isEditMode: boolean;
}

const DoctorForm = ({
    data,
    setData,
    processing,
    errors,
    degrees,
    institutes,
    specialities,
    roles,
    onSubmit,
    isEditMode,
}: Props) => {
    return (
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
                <Label>
                    Doctor's Title <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="e.g. Dr."
                />
                <InputError message={errors.title} />
            </div>

            {/* Locale Name */}
            <div>
                <Label>Name in your local language</Label>
                <Input
                    autoFocus
                    value={data.locale_name}
                    onChange={(e) => setData('locale_name', e.target.value)}
                    placeholder="Local name"
                />
                <InputError message={errors.locale_name} />
            </div>

            {/* Locale Title */}
            <div>
                <Label>Title in your local language</Label>
                <Input
                    value={data.locale_title}
                    onChange={(e) => setData('locale_title', e.target.value)}
                    placeholder="Title"
                />
                <InputError message={errors.locale_title} />
            </div>

            {/* Email */}
            <div>
                <Label>
                    Email <span className="ml-1 text-red-500">*</span>
                </Label>
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
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
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
                            ),
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

            {/* Roles */}
            <div>
                <Label>
                    Roles <span className="ml-1 text-red-500">*</span>
                </Label>
                <MultiSelect
                    options={roles}
                    value={data.role_ids}
                    onChange={(value) => setData('role_ids', value)}
                    label="Select Roles"
                    getOptionValue={(role) => role.name}
                    getOptionLabel={(role) => role.label}
                    protectedValues={['doctor']}
                />
                {Object.entries(errors)
                    .filter(([key]) => key.startsWith('role_ids'))
                    .map(([key, message]) => (
                        <InputError key={key} message={message} />
                    ))}
            </div>

            {/* Speciality */}
            <div>
                <Label>Specialties</Label>
                <MultiSelect
                    options={specialities}
                    value={data.speciality_ids}
                    onChange={(value) => setData('speciality_ids', value)}
                    label="Select Specialities"
                    getOptionValue={(s) => s.id.toString()}
                    getOptionLabel={(s) => s.name}
                />
                {Object.entries(errors)
                    .filter(([key]) => key.startsWith('speciality_ids'))
                    .map(([key, message]) => (
                        <InputError key={key} message={message} />
                    ))}
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
            <div>
                <Label>Doctor's Bio</Label>
                <Textarea
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                    placeholder="Enter doctor's bio"
                    rows={3}
                />
                <InputError message={errors.bio} />
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

            {/* Phones */}
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
                className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 md:col-span-2"
            >
                {processing
                    ? 'Creating...'
                    : isEditMode
                      ? 'Update Doctor'
                      : 'Create Doctor'}
            </Button>
        </form>
    );
};

export default DoctorForm;
