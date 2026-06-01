import { Plus, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
    label?: string;
    value: number[];
    onChange: (value: number[]) => void;
    maxDoses?: number;
};

export default function DoseSelector({
    label = 'Doses',
    value,
    onChange,
    maxDoses = 6,
}: Props) {
    const updateDose = (index: number, dose: number) => {
        const updated = [...value];
        updated[index] = Number.isNaN(dose) ? 0 : dose;
        onChange(updated);
    };

    const addDose = () => {
        if (value.length >= maxDoses) return;
        onChange([...value, 1]);
    };

    const removeDose = () => {
        if (value.length <= 3) return;
        onChange(value.slice(0, -1));
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="flex flex-wrap items-center justify-between gap-1 rounded-md border p-1">
                <div className="flex items-center gap-2">
                    {value.map((dose, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                type="number"
                                min="0"
                                step="1"
                                value={dose}
                                onChange={(e) =>
                                    updateDose(index, parseInt(e.target.value))
                                }
                                className="w-15"
                            />

                            {index !== value.length - 1 && (
                                <span className="text-muted-foreground">+</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={addDose}
                        disabled={value.length >= maxDoses}
                        className="inline-flex items-center justify-center rounded-md bg-green-600 p-1 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        <Plus size={14} />
                    </button>

                    <button
                        type="button"
                        onClick={removeDose}
                        disabled={value.length <= 3}
                        className="inline-flex items-center justify-center rounded-md bg-red-600 p-1 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
