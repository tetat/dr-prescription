import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/RoleController';
import { Paginate } from '@/components/paginate';
import TableSearch from '@/components/table-search';
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
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface RolePagination {
    data: Role[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    roles: RolePagination;
    filters: FilterProps;
}

const RoleIndex = ({ roles, filters }: IndexProps) => {
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(value && { perPage: value }),
            ...(data.search && { search: data.search }),
        };

        router.get(index(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const breadcrumbsData = [
        {
            title: 'Manage Roles',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Role Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    {/* <h1>Roles</h1> */}
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Role
                                </Link>
                            </div>
                        </div>
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
                            {roles.data.length > 0 ? (
                                roles.data?.map((role, index) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            {index + roles.from}
                                        </TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>{role.slug}</TableCell>
                                        <TableCell>{role.guard_name}</TableCell>
                                        <TableCell className="flex justify-end">
                                            <Link
                                                href={show(role)}
                                                className="mr-2 rounded bg-slate-400 px-3 py-1 text-white hover:bg-slate-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
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
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No roles found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={roles.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default RoleIndex;
