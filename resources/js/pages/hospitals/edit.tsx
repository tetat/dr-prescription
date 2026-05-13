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
        full_name: hospital.full_name ?? '',
        logo: null,
        logo_url: hospital.logo_url ?? '',
        moto: hospital.moto ?? '',
        address: hospital.address ?? '',
        phones: [...hospital.phones]
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(HospitalController.update.url(hospital.id));
    }

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

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
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

                    {/* Full Name */}
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            placeholder="Full name"
                        />
                        <InputError message={errors.full_name} />
                    </div>

                    {/* Logo */}
                    <div>
                        <Label>
                            Logo
                        </Label>
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
                            <ImagePreview file={data.logo} fallback={data.logo_url} />
                        </div>
                    </div>

                    {/* Moto */}
                    <div>
                        <Label>
                            Moto
                        </Label>
                        <Textarea
                            value={data.moto}
                            onChange={(e) => setData('moto', e.target.value)}
                            placeholder="Hospital moto"
                            rows={2}
                        />
                        <InputError message={errors.moto} />
                    </div>

                    {/* Address */}
                    <div>
                        <Label>
                            Address
                        </Label>
                        <Textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Hospital address"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Phones */}
                    <div className="md:col-span-2">
                        <Label>Phones <span className="text-red-500">*</span></Label>
                        <PhoneField
                            phones={data.phones}
                            setPhones={(phones) =>
                                setData('phones', phones)
                            }
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
                        className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Update Hospital
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default HospitalEdit;
