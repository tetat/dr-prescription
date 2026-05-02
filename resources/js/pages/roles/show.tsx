import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/roles';
import { Permission, Role } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    role: Role & {
        permissions?: Permission[];
    };
}

const RoleShow = ({ role }: Props) => {
    const breadcrumbsData = [
        {
            title: 'Manage Roles',
            href: index().url,
        },
        {
            title: 'Role Details',
            href: show(role).url,
        },
    ];

    // ✅ Group permissions by group
    function groupPermissions(perms: Permission[] = []) {
        return perms.reduce<Record<string, Permission[]>>((acc, perm) => {
            if (!acc[perm.group]) acc[perm.group] = [];
            acc[perm.group].push(perm);
            return acc;
        }, {});
    }

    const groupedPermissions = groupPermissions(role.permissions);

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Role: ${role.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Role Details
                </h2>

                <div className="space-y-6">
                    {/* Info Card */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="grid gap-5">
                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {role.label}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Slug
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {role.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Guard Name
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {role.guard_name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Card */}
                    {Object.keys(groupedPermissions).length > 0 && (
                        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                            <Label className="text-base font-semibold">
                                Permissions
                            </Label>

                            <div className="mt-4 space-y-5">
                                {Object.entries(groupedPermissions).map(
                                    ([group, perms]) => (
                                        <div key={group}>
                                            <p className="mb-2 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                                                {group.replace('_', ' ')} (
                                                {perms.length})
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {perms.map((perm) => (
                                                    <span
                                                        key={perm.id}
                                                        className="rounded-md border bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                    >
                                                        {perm.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between pt-2">
                        <Link href={index().url}>
                            <Button
                                variant="secondary"
                                className="cursor-pointer px-6"
                            >
                                Back
                            </Button>
                        </Link>

                        <Link href={edit(role).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Role
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default RoleShow;
