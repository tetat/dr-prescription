import { Phone } from './auth';

export type DoctorProfile = {
    user_id: number;
    title: string;
    locale_title: string;
    licence_no: string;
    bio: string;
};

export type DoctorSettingProps = {
    id: number;
    consultation_fee: number | '';
    followup_discount: number | '';
    emergency_fee: number | '';
    followup_valid_days: number | '';
};

export type DoctorProps = DoctorProfile & {
    id: number;
    name: string;
    locale_name: string;
    email: string;
    gender: string;
    blood_group?: string;
    address?: string;

    phones: Phone[];

    degrees: {
        degree_id: number | string;
        institute_id: number | string;
        passing_year: string;
    }[];

    speciality_ids: string[];

    role_ids: string[];
};
