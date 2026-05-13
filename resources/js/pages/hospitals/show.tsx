import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/hospitals';
import { Hospital, Phone } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface HospitalProps extends Hospital {
    logo: string;
    phones: Phone[];
}

const HospitalShow = ({ hospital }: { hospital: HospitalProps }) => {

    const breadcrumbsData = [
        {
            title: 'Manage Hospitals',
            href: index().url,
        },
        {
            title: 'Hospital Details',
            href: show(hospital).url,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Hospital: ${hospital.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Hospital Details
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
                                    {hospital.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Full Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {hospital.full_name ?? 'Not Given'}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Logo
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {hospital.logo ? (
                                        <img
                                            src={hospital.logo}
                                            alt={hospital.name}
                                            className="h-24 w-24 object-cover"
                                        />
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Moto
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {hospital.moto ?? 'Not Given'}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Address
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {hospital.address ?? 'Not Given'}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Phones
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {hospital.phones.map((phone) => (
                                        <span key={phone.id}>
                                            {phone.country_code}
                                            {phone.number}
                                        </span>
                                    ))}
                                </p>
                            </div>
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

                        <Link href={edit(hospital).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Hospital
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default HospitalShow;
