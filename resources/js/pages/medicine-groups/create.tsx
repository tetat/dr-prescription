import MedicineGroupController from '@/actions/App/Http/Controllers/MedicineGroupController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/medicine-groups';
import { MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';


const MedicineGroupCreate = () => {
    const { data, setData, post, processing, errors } = useForm<MedicineGroup>({
        id: 0,
        name: '',
        description: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(MedicineGroupController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Medicine Groups', href: index().url },
        { title: 'Create Medicine Group', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Medicine Group" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Medicine Group
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
                            placeholder="Medicine group name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Create Medicine Group
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default MedicineGroupCreate;
