import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

import { countries } from '@/data/countries';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const CountrySelect = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    const selected = countries.find((c) => c.dial_code === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-32 justify-between">
                    {selected ? (
                        <>
                            {selected.flag} {selected.dial_code}
                        </>
                    ) : (
                        'Select'
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />

                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>

                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.code}
                                    value={country.name}
                                    onSelect={() => {
                                        onChange(country.dial_code);
                                        setOpen(false);
                                    }}
                                >
                                    <span className="mr-2">{country.flag}</span>
                                    {country.name} ({country.dial_code})
                                    {value === country.dial_code && (
                                        <Check className="ml-auto h-4 w-4" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CountrySelect;
