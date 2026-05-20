import MedFormController from '@/actions/App/Http/Controllers/MedFormController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/med-forms';
import { MedForm } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const MedFormEdit = ({ medForm }: { medForm: MedForm }) => {
    const { data, setData, put, processing, errors } = useForm<MedForm>({
        id: medForm.id,
        short_name: medForm.short_name,
        long_name: medForm.long_name,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedFormController.update.url(medForm.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Medicine Forms', href: index().url },
        { title: 'Edit Medicine Form', href: edit(medForm.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Medicine Form" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Medicine Form
                </h2>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    {/* Short Name */}
                    <div>
                        <Label>
                            Short Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.short_name}
                            onChange={(e) => setData('short_name', e.target.value)}
                            placeholder="Short name"
                        />
                        <InputError message={errors.short_name} />
                    </div>

                    {/* Long Name */}
                    <div>
                        <Label>Long Name</Label>
                        <Input
                            value={data.long_name}
                            onChange={(e) => setData('long_name', e.target.value)}
                            placeholder="Long name"
                        />
                        <InputError message={errors.long_name} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Medicine Form
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default MedFormEdit;
