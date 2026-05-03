export type User = {
    id: number;
    name: string;
    email?: string;
    gender: string;
    dob: string;
    age?: string;
    address?: string;
    blood_group?: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    phones: Phone[];
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
    permissions?: Permission[];
};

export type Permission = {
    id: number;
    name: string;
    label: string;
    group: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    roles?: Role[];
};

export type Phone = {
    id: number;
    country_code: string;
    number: string;
};