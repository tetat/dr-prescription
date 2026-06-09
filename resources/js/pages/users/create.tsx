import UserController from '@/actions/App/Http/Controllers/UserController';
import UserForm from '@/components/users/user-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/users';
import { Phone, Role } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface UserProps {
    name: string;
    email: string;
    role_name: string;
    gender: string;
    blood_group: string;
    address: string;
    phones: Phone[];
}

const UserCreate = ({ roles }: { roles: Role[] }) => {
    const { data, setData, post, processing, errors } = useForm<UserProps>({
        name: '',
        email: '',
        role_name: '',
        gender: '',
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
        post(UserController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Users', href: index().url },
        { title: 'Create User', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create User" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create User
                </h2>

                <UserForm
                    roles={roles}
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={onSubmit}
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default UserCreate;
