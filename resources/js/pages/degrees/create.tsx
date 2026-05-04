import DegreeController from '@/actions/App/Http/Controllers/DegreeController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/degrees';
import { Degree } from '@/types';
import { Head, useForm } from '@inertiajs/react';


const DegreeCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Degree>({
        id: 0,
        name: '',
        abbreviation: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(DegreeController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Degrees', href: index().url },
        { title: 'Create Degree', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Degree" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Degree
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
                            placeholder="Degree name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Abbreviation */}
                    <div>
                        <Label>Abbreviation <span className="ml-1 text-red-500">*</span></Label>
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
                        Create Degree
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default DegreeCreate;
