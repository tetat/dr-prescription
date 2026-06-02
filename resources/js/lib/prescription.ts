export interface MedicineItem {
    medicine_id: string;
    duration: string;
    duration_type: string;
    doses: number[];
    instructions: string;
}

export const emptyMedicine = (): MedicineItem => ({
    medicine_id: '',
    duration: '7',
    duration_type: 'Day',
    doses: [1, 1, 1],
    instructions: '',
});
