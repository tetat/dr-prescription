import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/patients';
import { Phone, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    patient: User & {
        phones?: Phone[];
    };
}

const PatientShow = ({ patient }: Props) => {
    const breadcrumbsData = [
        {
            title: 'Manage Patients',
            href: index().url,
        },
        {
            title: 'Patient Details',
            href: show(patient).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Patient: ${patient.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Patient Details
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
                                    {patient.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Email
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {patient.email}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Gender
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {patient.gender}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Date of Birth
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {patient.age}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Blood Group
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {patient.blood_group}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Address
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {patient.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Phones Card */}
                    {patient.phones?.length > 0 && (
                        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                            <Label className="text-base font-semibold">
                                Phones
                            </Label>

                            <div className="mt-4 space-y-5">
                                {patient.phones.map((phone) => (
                                    <div key={phone.country_code + phone.number}>
                                        <p className="mb-2 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                                            {phone.country_code} {phone.number}
                                        </p>
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

                        <Link href={edit(patient).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Patient
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PatientShow;
