import RoleController from '@/actions/App/Http/Controllers/RoleController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

    const groupedPermissions = permissions;

    const selected = data.permissions;

    const allIds = Object.values(permissions)
        .flat()
        .map((p) => p.id);

    const allSelected =
        allIds.length > 0 && allIds.every((id) => selected.includes(id));

    const toggleAll = () => {
        setData('permissions', allSelected ? [] : allIds);
    };

    const toggleGroup = (items: Permission[]) => {
        const ids = items.map((p) => p.id);

        const allGroupSelected = ids.every((id) => selected.includes(id));

        setData(
            'permissions',
            allGroupSelected
                ? selected.filter((id) => !ids.includes(id))
                : [...new Set([...selected, ...ids])],
        );
    };

    const toggleSingle = (id: number) => {
        setData(
            'permissions',
            selected.includes(id)
                ? selected.filter((i) => i !== id)
                : [...selected, id],
        );
    };

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

                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input
                            value={data.label}
                            onChange={(e) => setData('label', e.target.value)}
                            placeholder="Role name"
                        />
                        <InputError message={errors.label} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Guard Name</Label>
                        <Input value={data.guard_name} readOnly />
                    </div>

                    {/* PERMISSIONS */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold">
                                Permissions
                            </Label>

                            <Button
                                type="button"
                                onClick={toggleAll}
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {allSelected ? 'Unselect All' : 'Select All'}
                            </Button>
                        </div>

                        {Object.entries(groupedPermissions).map(
                            ([group, items]) => {
                                const groupSelected = items.every((p) =>
                                    selected.includes(p.id),
                                );

                                return (
                                    <div
                                        key={group}
                                        className="rounded-lg border bg-muted/30 p-4 shadow-sm"
                                    >
                                        {/* GROUP HEADER */}
                                        <div className="mb-3 flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={groupSelected}
                                                onChange={() =>
                                                    toggleGroup(items)
                                                }
                                            />
                                            <Label className="text-sm font-semibold capitalize">
                                                {group.replace('_', ' ')}
                                            </Label>
                                        </div>

                                        {/* PERMISSIONS */}
                                        <div className="grid grid-cols-2 gap-2 pl-6">
                                            {items.map((permission) => (
                                                <label
                                                    key={permission.id}
                                                    className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-muted"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(
                                                            permission.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSingle(
                                                                permission.id,
                                                            )
                                                        }
                                                    />
                                                    {permission.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="mt-2 w-full cursor-pointer bg-green-600 py-2 text-base font-semibold hover:bg-green-700"
                    >
                        Update Role
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default RoleEdit;
