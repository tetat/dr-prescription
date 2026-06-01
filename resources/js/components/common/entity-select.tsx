// components/common/entity-select.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SelectOption } from '@/types';

interface Props {
    label: string;
    required?: boolean;
    value: string;
    options: SelectOption[];
    error?: string;
    onChange: (value: string) => void;
}

const EntitySelect = ({
    label,
    required,
    value,
    options,
    error,
    onChange,
}: Props) => {
    return (
        <div>
            <Label>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.id} value={opt.id.toString()}>
                            {opt.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <InputError message={error} />
        </div>
    );
};

export default EntitySelect;
