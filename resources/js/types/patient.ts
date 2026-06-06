import { Phone } from './auth';

export type PatientProps = {
    id: number;
    name: string;
    email?: string;
    gender: string;
    age: number;
    age_type: string;
    blood_group: string;
    address?: string;
    phones: Phone[];
};
