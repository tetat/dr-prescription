import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CountrySelect from './country-select';
import { Phone } from '@/types';
import { X } from 'lucide-react';


type Props = {
    phones: Phone[];
    setPhones: (phones: Phone[]) => void;
};

const PhoneField = ({ phones, setPhones }: Props) => {
    const updatePhone = (index: number, key: keyof Phone, value: string) => {
        const updated = [...phones];
        updated[index][key] = value;
        setPhones(updated);
    };

    const addPhone = () => {
        setPhones([...phones, { country_code: '+880', number: '' }]);
    };

    const removePhone = (index: number) => {
        setPhones(phones.filter((_, i) => i !== index));
    };

    return (
        <>
            {phones.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                    {/* Country Code */}
                    <CountrySelect
                        value={phone.country_code}
                        onChange={(value) =>
                            updatePhone(index, 'country_code', value)
                        }
                    />

                    {/* Number */}
                    <Input
                        value={phone.number}
                        onChange={(e) =>
                            updatePhone(index, 'number', e.target.value)
                        }
                        placeholder="Phone number"
                    />

                    {/* Remove */}
                    <Button
                        type="button"
                        onClick={() => removePhone(index)}
                        className="bg-red-500 w-10 h-9 text-white hover:bg-red-600"
                    >
                        <X />
                    </Button>
                </div>
            ))}

            {/* Add */}
            <Button
                type="button"
                onClick={addPhone}
                className="bg-gray-700 text-white"
            >
                Add Phone
            </Button>
        </>
    );
};

export default PhoneField;
