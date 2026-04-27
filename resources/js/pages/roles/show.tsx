import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/roles';
import { Role } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    role: Role;
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

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Role: ${role.name}`} />

            <div className="mx-auto mt-6 w-full max-w-2xl rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900">
                <h1 className="mb-6 text-xl font-bold">Role Details</h1>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-lg font-semibold">{role.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Slug</p>
                        <p className="text-lg font-semibold">{role.slug}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Guard Name</p>
                        <p className="text-lg font-semibold">
                            {role.guard_name}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Link
                        href={index().url}
                        className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default RoleShow;
