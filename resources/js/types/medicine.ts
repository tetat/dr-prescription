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

export type PrintMedicineProps = {
    id: number;
    name: string;
    pivot: {
        duration: number;
        duration_type: string;
        doses: number[];
        instructions: string;
    };
};
