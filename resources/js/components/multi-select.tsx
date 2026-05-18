import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

type BaseOption = {
    id: number;
};

type Props<T extends BaseOption> = {
    options: T[];
    value: string[];
    onChange: (value: string[]) => void;
    label?: string;

    getOptionValue: (option: T) => string;
    getOptionLabel: (option: T) => string;

    protectedValues?: string[];
};

const MultiSelect = <T extends BaseOption>({
    options,
    value,
    onChange,
    label,
    getOptionValue,
    getOptionLabel,
    protectedValues = [],
}: Props<T>) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleValue = (val: string) => {
        const isSelected = value.includes(val);

        // prevent unselect
        if (isSelected && protectedValues.includes(val)) {
            alert('Doctor role must be needed for Doctor!');
            return;
        }

        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedNames = options
        .filter((opt) => value.includes(getOptionValue(opt)))
        .map((opt) => getOptionLabel(opt));

    return (
        <div ref={ref} className="relative w-full">
            <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className="truncate text-muted-foreground">
                    {selectedNames.length > 0
                        ? selectedNames.join(', ')
                        : label || 'Select Options'}
                </span>

                <ChevronDown className="h-4 w-4" />
            </Button>

            {open && (
                <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white p-2 shadow-lg">
                    {options.map((opt) => {
                        const optionValue = getOptionValue(opt);

                        return (
                            <label
                                key={opt.id}
                                className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100"
                            >
                                <Checkbox
                                    checked={value.includes(optionValue)}
                                    
                                    onCheckedChange={() =>
                                        toggleValue(optionValue)
                                    }
                                />

                                <span>{getOptionLabel(opt)}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
