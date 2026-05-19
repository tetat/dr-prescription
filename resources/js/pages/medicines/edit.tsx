import MedicineController from '@/actions/App/Http/Controllers/MedicineController';
import InputError from '@/components/input-error';
import MultiSelect from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/medicines';
import { MedForm, Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    group: MedicineGroup;
    forms: MedForm[];
}

interface MedicineFormData extends Medicine {
    form_ids: number[];
}

interface Props {
    medicine: MedicineProps;
    medicineGroups: MedicineGroup[];
    medForms: MedForm[];
}

const MedicineEdit = ({ medicine, medicineGroups, medForms }: Props) => {
    const { data, setData, put, processing, errors } =
        useForm<MedicineFormData>({
            id: medicine.id,
            name: medicine.name,
            form_ids: medicine.forms.map((f) => f.id),
            strength: medicine.strength,
            medicine_group_id: medicine.group.id,
        });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(MedicineController.update.url(medicine.id));
    };

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
                            placeholder="Brand name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Generic Name */}
                    <div>
                        <Label>
                            Generic Name{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.medicine_group_id.toString()}
                            onValueChange={(value) =>
                                setData('medicine_group_id', Number(value))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Generic Name" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicineGroups.map((group) => (
                                    <SelectItem
                                        key={group.id}
                                        value={group.id.toString()}
                                    >
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

                        <MultiSelect
                            options={medForms}
                            value={data.form_ids.map(String)}
                            onChange={(value) =>
                                setData('form_ids', value.map(Number))
                            }
                            label="Select Forms"
                            getOptionValue={(f) => f.id.toString()}
                            getOptionLabel={(f) => f.long_name}
                        />
                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('form_ids'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>

                    {/* Strength */}
                    <div>
                        <Label>
                            Strength{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.strength}
                            onChange={(e) =>
                                setData('strength', e.target.value)
                            }
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
