import UserController from '@/actions/App/Http/Controllers/UserController';
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
import { edit, index } from '@/routes/users';
import { Phone, Role, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface UserProps {
    id: number;
    name: string;
    email: string;
    role_name: string;
    gender: string;
    blood_group: string;
    address: string;
    phones: Phone[];
}

interface Props {
    user: UserProps;
    roles: Role[];
}

const UserEdit = ({ user, roles }: Props) => {
    // console.log(user, roles);
    const { data, setData, put, processing, errors } = useForm<UserProps>({
        id: user.id,
        name: user.name,
        email: user.email ?? '',
        role_name: user.role_name ?? '',
        gender: user.gender ?? '',
        blood_group: user.blood_group ?? '',
        address: user.address ?? '',
        phones: user.phones,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(UserController.update.url(user.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Users', href: index().url },
        { title: 'Edit User', href: edit(user.id).url },
    ];

    const typedErrors = errors as Record<string, string>;

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit User" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit User
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

                    {/* Role */}
                    <div>
                        <Label>
                            Role <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.role_name}
                            onValueChange={(value) => setData('role_name', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                        {role.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role_name} />
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
                        Update User
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default UserEdit;
