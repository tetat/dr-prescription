import { ExaminationProps } from './examination';
import { MedicineWithPMPivot } from './medicine';
import { TestProps } from './test';

export type PrescriptionProps = {
    id: number;
    patient_id: number;
    doctor_id: number;
    hospital_id: number;
    chief_complaint: string;
    patient_weight: number;
    patient_height: number;
    next_visit: number;
    consultation_fee: number;
};

export type PMPivot = {
    prescription_id: string;
    medicine_id: string;
    duration: number;
    duration_type: string;
    doses: number[];
    instructions: string;
};

export type PrescriptionWithPMPivot = PrescriptionProps & {
    pivot: PMPivot;
};

export type PrescriptionEditProps = PrescriptionProps & {
    medicines: MedicineWithPMPivot[];
    tests: TestProps[];
    examinations: ExaminationProps[];
};
