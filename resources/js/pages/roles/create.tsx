import RoleController from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/roles';
import { Permission } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type Props = {
    permissions: Record<string, Permission[]>;
};

const RoleCreate = ({ permissions }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        guard_name: 'web',
        permissions: [] as number[],
    });

    const allIds = Object.values(permissions)
        .flat()
        .map((p) => p.id);

    const selected = data.permissions ?? [];

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

                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Role name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Guard Name</Label>
                        <Input defaultValue={data.guard_name} readOnly />
                    </div>

                    {/* PERMISSIONS */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold">
                                Permissions
                            </Label>

                            <button
                                type="button"
                                onClick={toggleAll}
                                className="rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                            >
                                {allSelected ? 'Unselect All' : 'Select All'}
                            </button>
                        </div>

                        {Object.entries(permissions).map(([group, items]) => {
                            const typedItems = items as Permission[];

                            const groupSelected = typedItems.every((p) =>
                                selected.includes(p.id),
                            );

                            return (
                                <div key={group} className="rounded border p-4">
                                    {/* GROUP HEADER */}
                                    <div className="mb-3 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={groupSelected}
                                            onChange={() =>
                                                toggleGroup(typedItems)
                                            }
                                        />
                                        <Label className="font-medium capitalize">
                                            {group}
                                        </Label>
                                    </div>

                                    {/* PERMISSIONS */}
                                    <div className="grid grid-cols-2 gap-2 pl-6">
                                        {typedItems.map((permission) => (
                                            <label
                                                key={permission.id}
                                                className="flex items-center gap-2"
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
                                                <span className="text-sm">
                                                    {permission.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                    >
                        Create Role
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default RoleCreate;
