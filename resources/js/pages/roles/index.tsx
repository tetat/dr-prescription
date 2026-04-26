import { destroy, edit } from '@/actions/App/Http/Controllers/RoleController';
import { Paginate } from '@/components/paginate';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/roles';
import { Role } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface RolePagination {
    data: Role[];
    links: LinkProps[];
    perPage: number;
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    roles: RolePagination;
    perPage: string;
    totalCount: number;
    filteredCount: number;
}

const RoleIndex = ({ roles, perPage }: IndexProps) => {
    const handlePerPageChange = (value: string) => {
        const queryString = {
            ...(value && { perPage: value }),
        };

        router.get(index().url, queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Role Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <h1>Roles</h1>
                    <div className="flex justify-end">
                        <Link
                            href={create().url}
                            className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Create Role
                        </Link>
                    </div>
                    <Table>
                        <TableCaption>A list of roles.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Guard Name</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.data?.map((role, index) => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.slug}</TableCell>
                                    <TableCell>{role.guard_name}</TableCell>
                                    <TableCell className="flex justify-end">
                                        <Link
                                            href={edit(role)}
                                            className="mr-2 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-700"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <Link
                                            href={destroy(role)}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={roles.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

RoleIndex.layout = {
    breadcrumbs: [
        {
            title: 'Manage Roles',
            href: index().url,
        },
    ],
};

export default RoleIndex;
