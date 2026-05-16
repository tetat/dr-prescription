import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/HospitalController';
import { Paginate } from '@/components/paginate';
import TableSearch from '@/components/table-search';
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
import { create, index } from '@/routes/hospitals';
import { Hospital } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Eye, Hospital as HospitalIcon, Pencil, Trash2 } from 'lucide-react';

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface HospitalProps extends Hospital {
    logo: string;
}

interface HospitalPagination {
    data: HospitalProps[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface IndexProps {
    hospitals: HospitalPagination;
    filters: FilterProps;
}

const HospitalIndex = ({ hospitals, filters }: IndexProps) => {
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

    const handleDelete = (hospital: Hospital) => {
        router.delete(destroy(hospital.id).url, {
            onBefore: () =>
                confirm('Are you sure you want to delete this hospital?'),
        });
    };

    const breadcrumbsData = [
        {
            title: 'Manage Hospitals',
            href: index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Hospital Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <div className="flex justify-end">
                        <div className="mb-4 flex w-full items-center justify-between gap-4">
                            <TableSearch
                                data={data}
                                setData={setData}
                                placeHolderMsg="Hospitals"
                                route={index().url}
                            />

                            <div className="ml-auto">
                                <Link
                                    href={create().url}
                                    className="mx-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create Hospital
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>A list of hospitals.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Moto</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hospitals.data.length > 0 ? (
                                hospitals.data?.map((hospital, index) => (
                                    <TableRow key={hospital.id}>
                                        <TableCell className="font-medium">
                                            {index + hospitals.from}
                                        </TableCell>
                                        <TableCell>{hospital.name}</TableCell>
                                        <TableCell>{hospital.full_name}</TableCell>
                                        <TableCell>
                                            {
                                                hospital.logo ?
                                                    <img
                                                        src={hospital.logo}
                                                        alt="logo"
                                                        className='size-10 rounded-md border object-cover'
                                                    /> : <HospitalIcon className='size-7' />
                                            }
                                        </TableCell>
                                        <TableCell>{hospital.moto}</TableCell>
                                        <TableCell>{hospital.address}</TableCell>
                                        <TableCell className="flex items-center justify-end gap-2">
                                            <Link
                                                href={show(hospital.id)}
                                                className="flex items-center justify-center rounded bg-slate-400 px-3 py-2 text-white hover:bg-slate-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                href={edit(hospital.id)}
                                                className="flex items-center justify-center rounded bg-green-500 px-3 py-2 text-white hover:bg-green-700"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(hospital)
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
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No hospitals found!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paginate
                        links={hospitals.links}
                        handlePerPageChange={handlePerPageChange}
                        perPage={data.perPage}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default HospitalIndex;
