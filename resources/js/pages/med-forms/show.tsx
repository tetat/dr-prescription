import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/med-forms';
import { MedForm } from '@/types';
import { Head, Link } from '@inertiajs/react';

const MedFormShow = ({ medForm }: { medForm: MedForm }) => {
    const breadcrumbsData = [
        {
            title: 'Manage Medicine Form',
            href: index().url,
        },
        {
            title: 'Medicine Form Details',
            href: show(medForm).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Medicine Form: ${medForm.short_name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    Medicine Form Details
                </h2>

                <div className="space-y-6">
                    {/* Info Card */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="grid gap-5">
                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Short Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medForm.short_name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Long Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {medForm.long_name}
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

                        <Link href={edit(medForm).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit Medicine Form
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default MedFormShow;
