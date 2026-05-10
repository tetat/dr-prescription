import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/doctors';
import { Degree, DoctorProfile, Phone, Speciality, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DegreeProps extends Degree {
    pivot?: {
        doctor_id: number;
        degree_id: number;
        institute_id: number;
        passing_year: string;

        institute?: {
            id: number;
            name: string;
        };
    }
}

interface Props {
    doctor: User & {
        phones: Phone[];
        specialities: Speciality[];
        degrees: DegreeProps[];
        doctor_profile: DoctorProfile;
    };
}

const DotorShow = ({ doctor }: Props) => {
    const breadcrumbsData = [
        {
            title: 'Manage Doctors',
            href: index().url,
        },
        {
            title: 'Doctor Details',
            href: show(doctor).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Doctor: ${doctor.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Doctor Details
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
                                    {doctor.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Email
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {doctor.email}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Gender
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {doctor.gender}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Title
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {doctor.doctor_profile?.title ?? 'N/A'}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Licence Number
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {doctor.doctor_profile?.licence_no ?? 'N/A'}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Address
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {doctor.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Degrees Card */}
                    {doctor.degrees.map((degree) => (
                        <div
                            key={degree.id}
                            className="space-y-1 rounded border p-3"
                        >
                            <p className="text-sm">
                                <span className="font-semibold">Degree:</span>{' '}
                                {degree.name}
                            </p>

                            <p className="text-sm">
                                <span className="font-semibold">Abbreviation:</span>{' '}
                                {degree.abbreviation}
                            </p>

                            <p className="text-sm">
                                <span className="font-semibold">Institute:</span>{' '}
                                {degree.pivot?.institute?.name ?? 'N/A'}
                            </p>

                            <p className="text-sm">
                                <span className="font-semibold">Passing Year:</span>{' '}
                                {degree.pivot?.passing_year}
                            </p>
                        </div>
                    ))}

                    {/* Specialities Card */}
                    {doctor.specialities?.length > 0 && (
                        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                            <Label className="text-base font-semibold">
                                Specialities
                            </Label>

                            <div className="mt-4 space-y-3">
                                {doctor.specialities.map((speciality) => (
                                    <div key={speciality.id}>
                                        <p className="text-sm font-bold uppercase text-muted-foreground">
                                            {speciality.name} ({speciality.abbreviation})
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Phones Card */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <Label className="text-base font-semibold">
                            Contact Numbers
                        </Label>

                        <div className="mt-4 space-y-5">
                            {doctor.phones.map((phone) => (
                                <div key={phone.country_code + phone.number}>
                                    <p className="mb-2 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                                        {phone.country_code} {phone.number}
                                    </p>
                                </div>
                            ),
                            )}
                        </div>
                    </div>

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

                        <Link href={edit(doctor).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Doctor
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default DotorShow;
