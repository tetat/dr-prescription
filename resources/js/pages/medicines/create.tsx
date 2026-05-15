import MedicineController from '@/actions/App/Http/Controllers/MedicineController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/medicines';
import { Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';


const MedicineCreate = ({ medicineGroups }: { medicineGroups: MedicineGroup[] }) => {
    const { data, setData, post, processing, errors } = useForm<Medicine>({
        id: 0,
        name: '',
        generic_name: '',
        form: '',
        strength: '',
        medicine_group_id: 0,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(MedicineController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Medicines', href: index().url },
        { title: 'Create Medicine', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Medicine" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Medicine
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
                            placeholder="Medicine name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Generic Name */}
                    <div>
                        <Label>
                            Generic Name
                        </Label>
                        <Input
                            value={data.generic_name}
                            onChange={(e) => setData('generic_name', e.target.value)}
                            placeholder="Generic name"
                        />
                        <InputError message={errors.generic_name} />
                    </div>

                    {/* Form */}
                    <div>
                        <Label>
                            Form <span className="ml-1 text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.form}
                            onValueChange={(value) => setData('form', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Form" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tablet">Tab</SelectItem>
                                <SelectItem value="capsule">Caps</SelectItem>
                                <SelectItem value="injection">Inj</SelectItem>
                                <SelectItem value="syrup">Syp</SelectItem>
                                <SelectItem value="infusion">Inf</SelectItem>
                                <SelectItem value="ors">ORS</SelectItem>
                                <SelectItem value="suppository">Supp</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.form} />
                    </div>

                    {/* Strength */}
                    <div>
                        <Label>
                            Strength <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.strength}
                            onChange={(e) => setData('strength', e.target.value)}
                            placeholder="e.g. 500mg"
                        />
                        <InputError message={errors.strength} />
                    </div>

                    {/* Medicine Group */}

                    <div>
                        <Label>
                            Medicine Group <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.medicine_group_id === 0 ? '' : data.medicine_group_id.toString()}
                            onValueChange={(value) => setData('medicine_group_id', Number(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Medicine Group" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicineGroups.map((medicineGroup) => (
                                    <SelectItem key={medicineGroup.id} value={medicineGroup.id.toString()}>
                                        {medicineGroup.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.medicine_group_id} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Create Medicine
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default MedicineCreate;
