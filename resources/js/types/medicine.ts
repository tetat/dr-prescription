import { PMPivot } from './prescription';

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

export type MedicineWithPMPivot = Medicine & {
    pivot: PMPivot;
};
