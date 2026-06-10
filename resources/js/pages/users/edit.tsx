import UserController from '@/actions/App/Http/Controllers/UserController';
import UserForm from '@/components/users/user-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/users';
import { Phone, Role } from '@/types';
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
    };

    const breadcrumbsData = [
        { title: 'Manage Users', href: index().url },
        { title: 'Edit User', href: edit(user.id).url },
    ];

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

                <UserForm
                    roles={roles}
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={onSubmit}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default UserEdit;
