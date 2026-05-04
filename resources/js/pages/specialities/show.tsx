import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/specialities';
import { Speciality } from '@/types';
import { Head, Link } from '@inertiajs/react';

const SpecialityShow = ({ speciality }: { speciality: Speciality }) => {
    const breadcrumbsData = [
        {
            title: 'Manage Specialities',
            href: index().url,
        },
        {
            title: 'Speciality Details',
            href: show(speciality).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Speciality: ${speciality.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Speciality Details
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
                                    {speciality.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Abbreviation
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {speciality.abbreviation ?? 'Not Given'}
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

                        <Link href={edit(speciality).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Speciality
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SpecialityShow;
