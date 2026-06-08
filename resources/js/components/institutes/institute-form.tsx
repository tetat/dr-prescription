import { Institute } from '@/types';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
    data: Institute;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
}

const InstituteForm = ({
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
                    placeholder="Institute name"
                />
                <InputError message={errors.name} />
            </div>

            {/* Locale Name */}
            <div>
                <Label>Name in your local language</Label>
                <Input
                    value={data.locale_name}
                    onChange={(e) => setData('locale_name', e.target.value)}
                    placeholder="Institute local name"
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

            {/* Locale Abbreviation */}
            <div>
                <Label>Abbreviation in your local language</Label>
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
                      ? 'Update Institute'
                      : 'Create Institute'}
            </Button>
        </form>
    );
};
export default InstituteForm;
