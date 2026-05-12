import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/DoctorProfileController';
import { Paginate } from '@/components/paginate';
import TableSearch from '@/components/table-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { create, index } from '@/routes/doctors';
import { User } from '@/types';
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

interface DoctorData extends User {
    licence_no: string;
    title: string;
    roles: string[];
}

interface UserPagination {
    data: DoctorData[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    doctors: UserPagination;
    filters: FilterProps;
}

const DoctorIndex = ({ doctors, filters }: IndexProps) => {
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

    const handleDelete = (doctor: User) => {
        router.delete(destroy(doctor.id).url, {
            onBefore: () =>
                confirm('Are you sure you want to delete this doctor?'),
        });
    };

    const breadcrumbsData = [
        {
            title: 'Manage Doctors',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Doctor Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Doctors"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Doctor
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of doctors.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>licence No</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors.data.length > 0 ? (
                                doctors.data?.map((doctor, index) => (
                                    <TableRow key={doctor.id}>
                                        <TableCell className="font-medium">
                                            {index + doctors.from}
                                        </TableCell>
                                        <TableCell>{doctor.name}</TableCell>
                                        <TableCell>{doctor.title}</TableCell>
                                        <TableCell>{doctor.email}</TableCell>
                                        <TableCell>{doctor.gender}</TableCell>
                                        <TableCell>{doctor.licence_no}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5">
                                                {doctor.roles?.map((role) => (
                                                    <Badge className='bg-blue-100 text-blue-900' key={role}>{role}</Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex items-center justify-end gap-2">
                                            <Link
                                                href={show(doctor.id)}
                                                className="flex items-center justify-center rounded bg-slate-400 px-3 py-2 text-white hover:bg-slate-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                href={edit(doctor.id)}
                                                className="flex items-center justify-center rounded bg-green-500 px-3 py-2 text-white hover:bg-green-700"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(doctor)
                                                }
                                                className="flex items-center justify-center rounded bg-red-500 px-3 py-2 text-white hover:bg-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center"
                                    >
                                        No doctors found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={doctors.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default DoctorIndex;
