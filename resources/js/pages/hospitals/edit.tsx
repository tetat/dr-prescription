import HospitalController from '@/actions/App/Http/Controllers/HospitalController';
import ImagePreview from '@/components/image-preview';
import InputError from '@/components/input-error';
import PhoneField from '@/components/phone-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/hospitals';
import { Hospital, Phone } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface HospitalProps extends Hospital {
    logo: File | null;
    logo_url: string;
    phones: Phone[];
}

const HospitalEdit = ({ hospital }: { hospital: HospitalProps }) => {
    const { data, setData, put, processing, errors } = useForm<HospitalProps>({
        id: hospital.id,
        name: hospital.name,
        locale_name: hospital.locale_name ?? '',
        full_name: hospital.full_name ?? '',
        locale_full_name: hospital.locale_full_name ?? '',
        logo: null,
        logo_url: hospital.logo_url ?? '',
        moto: hospital.moto ?? '',
        locale_moto: hospital.locale_moto ?? '',
        address: hospital.address ?? '',
        locale_address: hospital.locale_address ?? '',
        phones: [...hospital.phones],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(HospitalController.update.url(hospital.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Hospitals', href: index().url },
        { title: 'Edit Hospital', href: edit(hospital.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Examination" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Hospital
                </h2>

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="ml-1 text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Hospital name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Locale Name */}
                    <div>
                        <Label>Name in you local language</Label>
                        <Input
                            value={data.locale_name}
                            onChange={(e) =>
                                setData('locale_name', e.target.value)
                            }
                            placeholder="Hospital local name"
                        />
                        <InputError message={errors.locale_name} />
                    </div>

                    {/* Full Name */}
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            value={data.full_name}
                            onChange={(e) =>
                                setData('full_name', e.target.value)
                            }
                            placeholder="Full name"
                        />
                        <InputError message={errors.full_name} />
                    </div>

                    {/* Locale Full Name */}
                    <div>
                        <Label>Full Name in your local language</Label>
                        <Input
                            value={data.locale_full_name}
                            onChange={(e) =>
                                setData('locale_full_name', e.target.value)
                            }
                            placeholder="Local full name"
                        />
                        <InputError message={errors.locale_full_name} />
                    </div>

                    {/* Moto */}
                    <div>
                        <Label>Moto</Label>
                        <Textarea
                            value={data.moto}
                            onChange={(e) => setData('moto', e.target.value)}
                            placeholder="Hospital moto"
                            rows={2}
                        />
                        <InputError message={errors.moto} />
                    </div>

                    {/* Locale Moto */}
                    <div>
                        <Label>Moto in your local language</Label>
                        <Textarea
                            value={data.locale_moto}
                            onChange={(e) =>
                                setData('locale_moto', e.target.value)
                            }
                            placeholder="Hospital local moto"
                            rows={2}
                        />
                        <InputError message={errors.locale_moto} />
                    </div>

                    {/* Address */}
                    <div>
                        <Label>Address</Label>
                        <Textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Hospital address"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Locale Address */}
                    <div>
                        <Label>Address in your local language</Label>
                        <Textarea
                            value={data.locale_address}
                            onChange={(e) =>
                                setData('locale_address', e.target.value)
                            }
                            placeholder="Hospital local address"
                            rows={3}
                        />
                        <InputError message={errors.locale_address} />
                    </div>

                    {/* Logo */}
                    <div className="md:col-span-2">
                        <Label>Logo</Label>
                        <Input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData('logo', e.target.files[0]);
                                }
                            }}
                        />
                        <InputError message={errors.logo} />

                        <div className="mt-3">
                            <ImagePreview file={data.logo} />
                        </div>
                    </div>

                    {/* Phones */}
                    <div className="md:col-span-2">
                        <Label>
                            Phones <span className="text-red-500">*</span>
                        </Label>
                        <PhoneField
                            phones={data.phones}
                            setPhones={(phones) => setData('phones', phones)}
                        />

                        {Object.entries(errors)
                            .filter(([key]) => key.startsWith('phones'))
                            .map(([key, message]) => (
                                <InputError key={key} message={message} />
                            ))}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer md:col-span-2 bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Hospital
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default HospitalEdit;
