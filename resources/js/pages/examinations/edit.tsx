import ExaminationController from '@/actions/App/Http/Controllers/ExaminationController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/examinations';
import { Examination } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const ExaminationEdit = ({ examination }: { examination: Examination }) => {
    const { data, setData, put, processing, errors } = useForm<Examination>({
        id: examination.id,
        name: examination.name,
        abbreviation: examination.abbreviation,
        unit: examination.unit,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(ExaminationController.update.url(examination.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Examinations', href: index().url },
        { title: 'Edit Examination', href: edit(examination.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Examination" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Examination
                </h2>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Blood pressure"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Abbreviation */}
                    <div>
                        <Label>Abbreviation</Label>
                        <Input
                            value={data.abbreviation}
                            onChange={(e) => setData('abbreviation', e.target.value)}
                            placeholder="e.g. BP"
                        />
                        <InputError message={errors.abbreviation} />
                    </div>

                    {/* Unit */}
                    <div>
                        <Label>Unit <span className="ml-1 text-red-500">*</span></Label>
                        <Input
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="e.g. mmHg"
                        />
                        <InputError message={errors.unit} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Examination
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default ExaminationEdit;
