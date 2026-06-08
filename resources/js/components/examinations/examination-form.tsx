import { Examination } from '@/types';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
    data: Examination;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const ExaminationForm = ({
    data,
    setData,
    processing,
    errors,
    onSubmit,
    isEditMode,
}: Props) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
                <Label>
                    Name <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. Blood Pressure"
                />
                <InputError message={errors.name} />
            </div>

            {/* Abbreviation */}
            <div>
                <Label>
                    Abbreviation <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.abbreviation}
                    onChange={(e) => setData('abbreviation', e.target.value)}
                    placeholder="e.g. BP"
                />
                <InputError message={errors.abbreviation} />
            </div>

            {/* Unit */}
            <div>
                <Label>
                    Unit <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.unit}
                    onChange={(e) => setData('unit', e.target.value)}
                    placeholder="e.g. mmHg, mg/dL, etc."
                />
                <InputError message={errors.unit} />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={processing}
                className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
            >
                {processing
                    ? 'Loading...'
                    : isEditMode
                      ? 'Update Examination'
                      : 'Create Examination'}
            </Button>
        </form>
    );
};
export default ExaminationForm;
