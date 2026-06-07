import RoleController from '@/actions/App/Http/Controllers/RoleController';
import RoleForm from '@/components/roles/role-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/roles';
import { Permission } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type Props = {
    permissions: Record<string, Permission[]>;
};

const RoleCreate = ({ permissions }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        label: '',
        guard_name: 'web',
        permissions: [] as number[],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(RoleController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Roles', href: index().url },
        { title: 'Create Role', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Role" />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Role
                </h2>

                <RoleForm
                    permissions={permissions}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default RoleCreate;
