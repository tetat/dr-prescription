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
    is_emergency: boolean;
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

export type MedicineItem = {
    medicine_id: string;
    duration: string;
    duration_type: string;
    doses: number[];
    instructions: string;
};

export type PrescriptionFormProps = {
    id: string;
    doctor_id: string;
    patient_id: string;
    hospital_id: string;

    chief_complaint: string;

    patient_weight: string;
    patient_height: string;

    consultation_fee: string;
    is_emergency: boolean;
    next_visit: string;

    medicines: MedicineItem[];
    test_ids: string[];
    examination_ids: string[];
};
