import InstituteController from '@/actions/App/Http/Controllers/InstituteController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/institutes';
import { Institute } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const InstituteEdit = ({ institute }: { institute: Institute }) => {
    const { data, setData, put, processing, errors } = useForm<Institute>({
        id: institute.id,
        name: institute.name,
        locale_name: institute.locale_name ?? '',
        abbreviation: institute.abbreviation,
        locale_abbreviation: institute.locale_abbreviation ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(InstituteController.update.url(institute.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Institutes', href: index().url },
        { title: 'Edit Institute', href: edit(institute.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Institute" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Institute
                </h2>

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
                            onChange={(e) =>
                                setData('locale_name', e.target.value)
                            }
                            placeholder="Institute local name"
                        />
                        <InputError message={errors.locale_name} />
                    </div>

                    {/* Abbreviation */}
                    <div>
                        <Label>
                            Abbreviation{' '}
                            <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.abbreviation}
                            onChange={(e) =>
                                setData('abbreviation', e.target.value)
                            }
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
                        Update Institute
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default InstituteEdit;
