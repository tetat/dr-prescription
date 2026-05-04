import InstituteController from '@/actions/App/Http/Controllers/InstituteController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/institutes';
import { Institute } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const InstituteEdit = ({ institute }: { institute: Institute }) => {
    const { data, setData, put, processing, errors } = useForm<Institute>({
        id: institute.id,
        name: institute.name,
        abbreviation: institute.abbreviation,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(InstituteController.update.url(institute.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Institutes', href: index().url },
        { title: 'Edit Institute', href: edit(institute.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Institute" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Institute
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
                        Update Institute
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default InstituteEdit;
