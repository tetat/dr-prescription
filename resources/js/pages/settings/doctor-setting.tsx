import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head, useForm } from '@inertiajs/react';
import doctorSettings from '@/routes/doctor-settings';
import type { BreadcrumbItem } from '@/types';
import { DoctorSettingProps } from '@/types/doctor';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { Info } from 'lucide-react';

const DoctorSettingEdit = ({
    doctorSetting,
}: {
    doctorSetting: DoctorSettingProps;
}) => {
    useFlashToast();

    const { data, setData, put, processing, errors } = useForm({
        consultation_fee: doctorSetting.consultation_fee,
        followup_discount: doctorSetting.followup_discount,
        emergency_fee: doctorSetting.emergency_fee,
        followup_valid_days: doctorSetting.followup_valid_days,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(doctorSettings.update(doctorSetting.id).url);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Doctor Setting',
            href: doctorSettings.edit(doctorSetting.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Doctor Settings" />

            <SettingsLayout>
                <div className="mx-auto mt-6 w-2xl p-4">
                    <h2 className="py-3 text-center text-2xl font-bold">
                        Doctor Settings
                    </h2>

                    <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        {/* Consultation Fee */}
                        <div>
                            <Label>
                                Consultation Fee{' '}
                                <span className="ml-1 text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                value={data.consultation_fee}
                                onChange={(e) =>
                                    setData(
                                        'consultation_fee',
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                placeholder="Consultation fee"
                            />
                            <InputError message={errors.consultation_fee} />
                        </div>

                        {/* Followup Discount */}
                        <div>
                            <div className="flex items-center gap-2">
                                <Label>
                                    Followup Discount{' '}
                                    <span className="ml-1 text-red-500">*</span>
                                </Label>

                                <div className="group relative">
                                    <button
                                        type="button"
                                        className="text-xs text-blue-600"
                                    >
                                        <Info className="h-4 w-4 cursor-pointer text-muted-foreground" />
                                    </button>

                                    <div className="absolute top-0 left-6 hidden w-56 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
                                        You can set Followup Discount to 0 if
                                        you don't want to give discount.
                                    </div>
                                </div>
                            </div>

                            <Input
                                type="number"
                                value={data.followup_discount}
                                onChange={(e) =>
                                    setData(
                                        'followup_discount',
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                placeholder="Followup discount"
                            />

                            <InputError message={errors.followup_discount} />
                        </div>

                        {/* Emergency Fee */}
                        <div>
                            <Label>
                                Emergency Fee{' '}
                                <span className="ml-1 text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                value={data.emergency_fee}
                                onChange={(e) =>
                                    setData(
                                        'emergency_fee',
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                placeholder="Emergency fee"
                            />
                            <InputError message={errors.emergency_fee} />
                        </div>

                        {/* Followup Valid Days */}
                        <div>
                            <Label>
                                Followup Valid Days{' '}
                                <span className="ml-1 text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                value={data.followup_valid_days}
                                onChange={(e) =>
                                    setData(
                                        'followup_valid_days',
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                placeholder="Valid days"
                            />
                            <InputError message={errors.followup_valid_days} />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
                        >
                            Update Setting
                        </Button>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default DoctorSettingEdit;
