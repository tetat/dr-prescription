import { Test } from '@/types';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface Props {
    data: Test;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const TestForm = ({
    data,
    setData,
    errors,
    processing,
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
                    placeholder="Test name"
                />
                <InputError message={errors.name} />
            </div>

            {/* Description */}
            <div>
                <Label>Description</Label>
                <Textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={3}
                    placeholder="Description"
                />
                <InputError message={errors.description} />
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
                      ? 'Update Test'
                      : 'Create Test'}
            </Button>
        </form>
    );
};
export default TestForm;
