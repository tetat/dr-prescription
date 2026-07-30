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

export interface ExaminationItem {
    examination_id: string;
    result: string;
    interpretation: string;
}

interface Props {
    examinations: ExaminationItem[];
    setExaminations: (value: ExaminationItem[]) => void;
    options: SelectOption[];
    errors: Record<string, string>;
}

const ExaminationField = ({
    examinations,
    setExaminations,
    options,
    errors,
}: Props) => {
    const update = (
        index: number,
        key: keyof ExaminationItem,
        value: string,
    ) => {
        const items = [...examinations];
        items[index][key] = value;
        setExaminations(items);
    };

    const add = () => {
        setExaminations([
            ...examinations,
            {
                examination_id: '',
                result: '',
                interpretation: '',
            },
        ]);
    };

    const remove = (index: number) => {
        setExaminations(examinations.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Label>Examinations</Label>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={add}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Examination
                </Button>
            </div>

            {examinations.map((exam, index) => (
                <div
                    key={index}
                    className="grid grid-cols-12 gap-3 rounded-lg border mt-1 p-4"
                >
                    <div className="col-span-4">
                        <Label>Examination</Label>

                        <Select
                            value={exam.examination_id}
                            onValueChange={(value) =>
                                update(index, 'examination_id', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select examination" />
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
                            message={
                                errors[
                                    `examinations.${index}.examination_id`
                                ]
                            }
                        />
                    </div>

                    <div className="col-span-3">
                        <Label>Result</Label>

                        <Input
                            value={exam.result}
                            onChange={(e) =>
                                update(index, 'result', e.target.value)
                            }
                            placeholder="Result"
                        />

                        <InputError
                            message={errors[`examinations.${index}.result`]}
                        />
                    </div>

                    <div className="col-span-4">
                        <Label>Interpretation</Label>

                        <Input
                            value={exam.interpretation}
                            onChange={(e) =>
                                update(
                                    index,
                                    'interpretation',
                                    e.target.value,
                                )
                            }
                            placeholder="Interpretation"
                        />

                        <InputError
                            message={
                                errors[
                                    `examinations.${index}.interpretation`
                                ]
                            }
                        />
                    </div>

                    <div className="col-span-1 flex items-end">
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ExaminationField;