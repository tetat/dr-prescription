import { MedForm, Medicine, MedicineGroup } from '@/types';
import InputError from '../input-error';
import MultiSelect from '../multi-select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface MedicineProps extends Medicine {
    form_ids: number[];
}

interface Props {
    medicineGroups: MedicineGroup[];
    medForms: MedForm[];
    data: MedicineProps;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const MedicineForm = ({
    medicineGroups,
    medForms,
    data,
    setData,
    errors,
    processing,
    onSubmit,
    isEditMode,
}: Props) => {
    return (
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
                    Generic Name <span className="ml-1 text-red-500">*</span>
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
                    onChange={(value) => setData('form_ids', value.map(Number))}
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
                    Strength <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.strength}
                    onChange={(e) => setData('strength', e.target.value)}
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
                {processing
                    ? 'Loading...'
                    : isEditMode
                      ? 'Update Medicine'
                      : 'Create Medicine'}
            </Button>
        </form>
    );
};
export default MedicineForm;
