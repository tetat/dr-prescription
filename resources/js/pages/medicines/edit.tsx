import MedicineController from '@/actions/App/Http/Controllers/MedicineController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/medicines';
import { Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    group: MedicineGroup;
}

interface Props {
    medicine: MedicineProps,
    medicineGroups: MedicineGroup[]
}

const MedicineEdit = ({ medicine, medicineGroups }: Props) => {
    const { data, setData, put, processing, errors } = useForm<Medicine>({
        id: medicine.id,
        name: medicine.name,
        form: medicine.form,
        strength: medicine.strength,
        medicine_group_id: medicine.group.id,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedicineController.update.url(medicine.id));
    }

    const breadcrumbsData = [
        { title: 'Manage Medicines', href: index().url },
        { title: 'Edit Medicine', href: edit(medicine.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Medicine" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Medicine
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
                            Generic Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.medicine_group_id.toString()}
                            onValueChange={(value) => setData('medicine_group_id', Number(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Generic Name" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicineGroups.map((group) => (
                                    <SelectItem key={group.id} value={group.id.toString()}>
                                        {group.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.medicine_group_id} />
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
                                <SelectValue placeholder="Select medicine form" />
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
                            placeholder="Medicine strength"
                        />
                        <InputError message={errors.strength} />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Medicine
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default MedicineEdit;
