import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import { Users, CalendarDays, FileText, UsersRound } from 'lucide-react';

interface Props {
    stats: {
        patients: number;
        appointments: number;
        prescriptions: number;
    };
    recentPatients: {
        id: number;
        name: string;
        chief_complaint: string | null;
        date: string;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard({
    stats,
    recentPatients,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Patients */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-sidebar">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Patients
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.patients}
                                </h2>
                            </div>

                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-500/20">
                                <Users className="size-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Appointments */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-sidebar">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Today's Appointments
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.appointments}
                                </h2>
                            </div>

                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-500/20">
                                <CalendarDays className="size-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Prescriptions */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-sidebar">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Prescriptions This Month
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.prescriptions}
                                </h2>
                            </div>

                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-500/20">
                                <FileText className="size-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patients List */}
                <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-sidebar">
                    <div className="mb-4 flex items-center gap-2">
                        <UsersRound className="size-5 text-primary" />

                        <h2 className="text-lg font-semibold">
                            Recent Patients
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {recentPatients.length > 0 ? (
                            recentPatients.map((patient) => (
                                <div
                                    key={patient.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="font-medium">{patient.name}</p>

                                        <p className="text-sm text-muted-foreground">
                                            {patient.chief_complaint || 'No chief complaint'}
                                        </p>
                                    </div>

                                    <span className="text-sm text-muted-foreground">
                                        {patient.date}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">
                                No recent patients.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
