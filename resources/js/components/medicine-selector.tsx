import { useMemo, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface Medicine {
    id: number;
    name: string;
    strength: string;
    search_text: string;
    group: {
        id: number;
        name: string;
    };
    forms: {
        id: number;
        short_name: string;
    }[];
}

interface Props {
    label?: string;
    medicines: Medicine[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function MedicineSelector({
    medicines,
    value,
    onChange,
    label = 'Medicine',
    error = '',
}: Props) {
    const [open, setOpen] = useState(false);

    const selected = useMemo(
        () => medicines.find((m) => m.id.toString() === value),
        [medicines, value],
    );

    return (
        <div className="space-y-1">
            {/* Label */}
            <Label>{label}</Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                    >
                        {selected
                            ? `${selected.name} ${selected.strength}`
                            : 'Search medicine...'}

                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[500px] p-0">
                    <Command>
                        {/* SEARCH */}
                        <CommandInput placeholder="Search by medicine, group, or form..." />

                        <CommandEmpty>No medicine found.</CommandEmpty>

                        <CommandGroup>
                            {medicines.map((medicine) => (
                                <CommandItem
                                    key={medicine.id}
                                    value={medicine.search_text}
                                    onSelect={() => {
                                        onChange(medicine.id.toString());
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {medicine.name} {medicine.strength}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            {medicine.group?.name}
                                            {medicine.forms.length > 0 && (
                                                <>
                                                    {' • '}
                                                    {medicine.forms
                                                        .map(
                                                            (f) => f.short_name,
                                                        )
                                                        .join(', ')}
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    {value === medicine.id.toString() && (
                                        <Check className="ml-auto h-4 w-4" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
