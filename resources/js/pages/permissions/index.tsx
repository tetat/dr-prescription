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
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/permissions';
import { Permission } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface PermissionPagination {
    data: Permission[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    permissions: PermissionPagination;
    filters: FilterProps;
}

const PermissionIndex = ({ permissions, filters }: IndexProps) => {
    useFlashToast();

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
            title: 'Permissions',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Permissions" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Permissions"
                                route={index().url}
                            />
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of permissions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Group</TableHead>
                                <TableHead className="text-right">
                                    Guard Name
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions.data.length > 0 ? (
                                permissions.data?.map((permission, index) => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="font-medium">
                                            {index + permissions.from}
                                        </TableCell>
                                        <TableCell>{permission.label}</TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>
                                            {permission.group}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {permission.guard_name}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No permissions found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={permissions.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default PermissionIndex;
