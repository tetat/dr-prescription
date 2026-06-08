import { Degree } from '@/types';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
    data: Degree;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const DegreeForm = ({
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
                    placeholder="Degree name"
                />
                <InputError message={errors.name} />
            </div>

            {/* Locale Name */}
            <div>
                <Label>Name in your local language</Label>
                <Input
                    value={data.locale_name}
                    onChange={(e) => setData('locale_name', e.target.value)}
                    placeholder="Degree name in local"
                />
                <InputError message={errors.locale_name} />
            </div>

            {/* Abbreviation */}
            <div>
                <Label>
                    Abbreviation <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                    value={data.abbreviation}
                    onChange={(e) => setData('abbreviation', e.target.value)}
                    placeholder="Abbreviation"
                />
                <InputError message={errors.abbreviation} />
            </div>

            {/* Local Abbreviation */}
            <div>
                <Label>Abbreviation in your locale language</Label>
                <Input
                    value={data.locale_abbreviation}
                    onChange={(e) =>
                        setData('locale_abbreviation', e.target.value)
                    }
                    placeholder="Abbreviation in local"
                />
                <InputError message={errors.locale_abbreviation} />
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
                      ? 'Update Degree'
                      : 'Create Degree'}
            </Button>
        </form>
    );
};

export default DegreeForm;
