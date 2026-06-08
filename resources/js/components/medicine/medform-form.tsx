import { MedForm } from '@/types';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
    data: MedForm;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const MedformForm = ({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    isEditMode,
}: Props) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Short Name */}
            <div>
                <Label>
                    Short Name <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.short_name}
                    onChange={(e) => setData('short_name', e.target.value)}
                    placeholder="Short name"
                />
                <InputError message={errors.short_name} />
            </div>

            {/* Long Name */}
            <div>
                <Label>Long Name</Label>
                <Input
                    value={data.long_name}
                    onChange={(e) => setData('long_name', e.target.value)}
                    placeholder="Long name"
                />
                <InputError message={errors.long_name} />
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
                      ? 'Update Medicine Form'
                      : 'Create Medicine Form'}
            </Button>
        </form>
    );
};
export default MedformForm;
