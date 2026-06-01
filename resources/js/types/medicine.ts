import { PMPivot } from './prescription';

export type MedicineProps = {
    id: number;
    name: string;
    strength: string;
    medicine_group_id: number;
};

export type MedicineWithPMPivot = MedicineProps & {
    pivot: PMPivot;
};
