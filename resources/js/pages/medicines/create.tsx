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
import { create, index } from '@/routes/medicines';
import { MedForm, Medicine, MedicineGroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface MedicineProps extends Medicine {
    form_ids: number[];
}

interface Props {
    medicineGroups: MedicineGroup[];
    medForms: MedForm[];
}

const MedicineCreate = ({ medicineGroups, medForms }: Props) => {
    const { data, setData, post, processing, errors } = useForm<MedicineProps>({
        id: 0,
        name: '',
        form_ids: [],
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
                            value={
                                data.medicine_group_id === 0
                                    ? ''
                                    : data.medicine_group_id.toString()
                            }
                            onValueChange={(value) =>
                                setData('medicine_group_id', Number(value))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Generic Name" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicineGroups.map((medicineGroup) => (
                                    <SelectItem
                                        key={medicineGroup.id}
                                        value={medicineGroup.id.toString()}
                                    >
                                        {medicineGroup.name}
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
                            placeholder="e.g. 500mg"
                        />
                        <InputError message={errors.strength} />
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
