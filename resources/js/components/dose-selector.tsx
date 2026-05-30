import { Plus, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
    const toggleDose = (index: number) => {
        const updated = [...value];
        updated[index] = updated[index] ? 0 : 1;
        onChange(updated);
    };

    const addDose = () => {
        if (value.length >= maxDoses) return;
        onChange([...value, 1]);
    };

    const removeDose = () => {
        if (value.length <= 1) return;
        onChange(value.slice(0, -1));
    };

    return (
        <div className="space-y-2">
            {/* Label */}
            <Label className="text-sm font-medium">{label}</Label>

            {/* Body */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2">
                {/* Checkboxes */}
                <div className="flex items-center gap-2">
                    {value.map((dose, index) => (
                        <label key={index} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={dose === 1}
                                onChange={() => toggleDose(index)}
                                className="h-4 w-4"
                            />

                            {index !== value.length - 1 && (
                                <span className="text-muted-foreground">+</span>
                            )}
                        </label>
                    ))}
                </div>

                {/* Controls */}
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
                        disabled={value.length <= 1}
                        className="inline-flex items-center justify-center rounded-md bg-red-600 p-1 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
