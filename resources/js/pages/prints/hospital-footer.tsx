import { Phone } from '@/types';
import { HospitalIcon } from 'lucide-react';

interface Props {
    hospitalName: string;
    hospitalLogo: string;
    phones: Phone[];
}

export default function HospitalFooter({
    hospitalName,
    hospitalLogo,
    phones,
}: Props) {
    return (
        <div className="border-t py-4">
            <div className="grid grid-cols-3 items-end">
                {/* Left */}
                <div className="text-left text-xs">
                    <p className="font-semibold">For Appointment</p>

                    {phones.map((phone) => (
                        <div key={phone.country_code}>
                            {phone.country_code + phone.number}
                        </div>
                    ))}
                </div>

                {/* Center */}
                <div className="flex flex-col items-center">
                    {hospitalLogo ? (
                        <img
                            src={hospitalLogo}
                            alt={hospitalName}
                            className="h-12 w-auto object-contain"
                        />
                    ) : (
                        <HospitalIcon className="h-12 w-12" />
                    )}

                    <p className="mt-2 text-sm font-semibold">{hospitalName}</p>
                </div>

                {/* Right */}
                <div className="text-right text-xs">
                    <p className="font-semibold">যোগাযোগ</p>

                    {phones.map((phone) => (
                        <div key={phone.country_code}>
                            {phone.country_code + phone.number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
