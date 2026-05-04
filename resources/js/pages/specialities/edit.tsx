import SpecialityController from '@/actions/App/Http/Controllers/SpecialityController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/specialities';
import { Speciality } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const SpecialityEdit = ({ speciality }: { speciality: Speciality }) => {
    const { data, setData, put, processing, errors } = useForm<Speciality>({
        id: speciality.id,
        name: speciality.name,
        abbreviation: speciality.abbreviation,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(SpecialityController.update.url(speciality.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Specialities', href: index().url },
        { title: 'Edit Speciality', href: edit(speciality.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Speciality" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Speciality
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
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Abbreviation */}
                    <div>
                        <Label>Abbreviation</Label>
                        <Input
                            value={data.abbreviation}
                            onChange={(e) => setData('abbreviation', e.target.value)}
                            placeholder="Abbreviation"
                        />
                        <InputError message={errors.abbreviation} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Speciality
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default SpecialityEdit;
