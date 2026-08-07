import InputError from '@/components/input-error';
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
import { SelectOption } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

export interface TestItem {
    test_id: string;
    result: string;
}

interface Props {
    tests: TestItem[];
    setTests: (value: TestItem[]) => void;
    options: SelectOption[];
    errors: Record<string, string>;
}

const TestField = ({
    tests,
    setTests,
    options,
    errors,
}: Props) => {
    const update = (
        index: number,
        key: keyof TestItem,
        value: string,
    ) => {
        const items = [...tests];
        items[index][key] = value;
        setTests(items);
    };

    const add = () => {
        setTests([
            ...tests,
            {
                test_id: '',
                result: '',
            },
        ]);
    };

    const remove = (index: number) => {
        setTests(tests.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Label>Tests</Label>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={add}
                >
                    <Plus className="h-4 w-4" />
                    Test
                </Button>
            </div>

            {tests.map((test, index) => (
                <div
                    key={index}
                    className="relative mt-1 grid grid-cols-12 gap-3 rounded-lg border pt-3 pb-1.5 px-3"
                >
                    {/* Remove Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="absolute top-0.5 right-1 h-6 w-6 bg-red-500 text-white hover:text-red-50 hover:bg-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="col-span-4">
                        <Label>Test</Label>

                        <Select
                            value={test.test_id}
                            onValueChange={(value) =>
                                update(index, 'test_id', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select test" />
                            </SelectTrigger>

                            <SelectContent>
                                {options.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id.toString()}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError
                            message={errors[`tests.${index}.test_id`]}
                        />
                    </div>

                    <div className="col-span-3">
                        <Label>Result</Label>

                        <Input
                            value={test.result}
                            onChange={(e) =>
                                update(index, 'result', e.target.value)
                            }
                            placeholder="Result"
                        />

                        <InputError
                            message={errors[`tests.${index}.result`]}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default TestField;