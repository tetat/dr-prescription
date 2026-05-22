export type User = {
    id: number;
    name: string;
    email?: string | null;
    gender: string;
    age?: number | null;
    age_type?: string | null;
    address?: string | null;
    blood_group?: string | null;
    avatar?: string | null;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};

export type Role = {
    id: number;
    name: string;
    label: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type Permission = {
    id: number;
    name: string;
    label: string;
    group: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type Phone = {
    country_code: string;
    number: string;
};

export type DoctorProfile = {
    user_id: number;
    title: string;
    locale_title: string;
    licence_no: string;
    bio: string;
};

export type Degree = {
    id: number;
    name: string;
    abbreviation: string;
};

export type Speciality = {
    id: number;
    name: string;
    abbreviation: string;
};

export type Institute = {
    id: number;
    name: string;
    abbreviation: string;
};

export type Test = {
    id: number;
    name: string;
    description: string;
};

export type Examination = {
    id: number;
    name: string;
    abbreviation: string;
    unit: string;
};

export type Hospital = {
    id: number;
    name: string;
    full_name: string;
    moto: string;
    address: string;
};

export type MedicineGroup = {
    id: number;
    name: string;
    description?: string;
};

export type Medicine = {
    id: number;
    name: string;
    strength: string;
    medicine_group_id: number;
};

export type MedForm = {
    id: number;
    short_name: string;
    long_name: string;
};
