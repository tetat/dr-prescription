import RoleController from '@/actions/App/Http/Controllers/RoleController';
import RoleForm from '@/components/roles/role-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/roles';
import { Permission, Role } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    role: Role & {
        permissions?: Permission[];
    };
    permissions: Record<string, Permission[]>;
}

const RoleEdit = ({ role, permissions }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        label: role.label,
        guard_name: role.guard_name,
        permissions: role.permissions?.map((p) => p.id) || [],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(RoleController.update(role.id).url);
    };

    const breadcrumbsData = [
        { title: 'Manage Roles', href: index().url },
        { title: 'Edit Role', href: edit(role).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Role" />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Role
                </h2>

                <RoleForm
                    permissions={permissions}
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

export default RoleEdit;
