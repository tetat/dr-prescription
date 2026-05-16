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
    country_code: string;
    number: string;
};

export type DoctorProfile = {
    user_id: number;
    title: string;
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
}

export type Examination = {
    id: number;
    name: string;
    abbreviation: string;
    unit: string;
}

export type Hospital = {
    id: number;
    name: string;
    full_name: string;
    moto: string;
    address: string;
}

export type MedicineGroup = {
    id: number;
    name: string;
    description?: string;
}

export type Medicine = {
    id: number;
    name: string;
    form: string;
    strength: string;
    medicine_group_id: number;
}