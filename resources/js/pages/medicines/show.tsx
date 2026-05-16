import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/medicines';
import { Medicine, MedicineGroup } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    group: MedicineGroup;
}

const MedicineShow = ({ medicine }: { medicine: MedicineProps }) => {
    const breadcrumbsData = [
        {
            title: 'Manage Medicines',
            href: index().url,
        },
        {
            title: 'Medicine Details',
            href: show(medicine).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Medicine Details: ${medicine.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Medicine Details
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
                                    {medicine.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Generic Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medicine.group.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Form
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medicine.form}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Strength
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medicine.strength}
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

                        <Link href={edit(medicine).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Medicine
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default MedicineShow;
