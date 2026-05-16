import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/medicine-groups';
import { MedicineGroup } from '@/types';
import { Head, Link } from '@inertiajs/react';

const MedicineGroupShow = ({ medicineGroup }: { medicineGroup: MedicineGroup }) => {
    const breadcrumbsData = [
        {
            title: 'Manage Medicine Groups',
            href: index().url,
        },
        {
            title: 'Medicine Group Details',
            href: show(medicineGroup).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Medicine Group: ${medicineGroup.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Medicine Group Details
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
                                    {medicineGroup.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Description
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medicineGroup.description ?? 'N/A'}
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

                        <Link href={edit(medicineGroup).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Medicine Group
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default MedicineGroupShow;
