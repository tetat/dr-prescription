import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Speciality } from '@/types';
import { ChevronDown } from 'lucide-react';

type Props = {
    options: Speciality[];
    value: string[];
    onChange: (value: string[]) => void;
    label?: string;
};

const MultiSelect = ({ options, value, onChange, label }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleValue = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedNames = options
        .filter((opt) => value.includes(opt.id.toString()))
        .map((opt) => opt.name);

    return (
        <div ref={ref} className="relative w-full">
            {/* Button */}
            <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="truncate text-muted-foreground">
                    {selectedNames.length > 0
                        ? selectedNames.join(', ')
                        : label || 'Select Specialities'}
                </span>
                <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white p-2 shadow-lg">
                    {options.map((opt) => (
                        <label
                            key={opt.id}
                            className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100"
                        >
                            <Checkbox
                                checked={value.includes(opt.id.toString())}
                                onCheckedChange={() =>
                                    toggleValue(opt.id.toString())
                                }
                            />
                            <span>{opt.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;