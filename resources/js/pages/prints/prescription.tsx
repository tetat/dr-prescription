import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import { useEffect } from 'react';

interface Examination {
    id: number;
    name: string;
    pivot: {
        result?: string;
        interpretation?: string;
    };
}

interface Test {
    id: number;
    name: string;
    pivot: {
        result?: string;
    };
}

interface Medicine {
    id: number;
    name: string;
    pivot: {
        duration: number;
        duration_type: string;
        doses: string[];
        instructions: string;
    };
}

interface Payment {
    id: number;
    amount: number;
    method: string;
    status: string;
}

interface Doctor {
    id: number;
    name: string;
    locale_name: string;

    doctor_profile?: {
        title: string;
        locale_title: string;
        licence_no: string;
        bio: string;
    };
}

interface Patient {
    id: number;
    name: string;
    age: number;
    age_type: string;
    gender: string;
}

interface Hospital {
    id: number;
    name: string;
}

interface Prescription {
    id: number;
    code: string;
    chief_complaint: string;
    consultation_fee: number;
    remaining_fee: number;
    next_visit: string | null;

    doctor: Doctor;
    patient: Patient;
    hospital: Hospital;

    medicines: Medicine[];
    examinations: Examination[];
    tests: Test[];
    payments: Payment[];
}

interface Props {
    prescription: Prescription;
}

export default function PrescriptionPrint({ prescription }: Props) {
    useEffect(() => {
        setTimeout(() => window.print(), 500);
    }, []);

    return (
        <>
            <Head title={`Prescription ${prescription.code}`} />

            <div className="min-h-screen bg-white text-black">
                {/* Header */}
                <div className="border-b pb-4 text-center">
                    <h1 className="text-3xl font-bold">
                        {prescription.hospital.name}
                    </h1>

                    <div className="mt-4 grid grid-cols-3">
                        {/* Doctor Bengali */}
                        <div className="text-left">
                            <h2 className="text-xl font-bold">
                                {prescription.doctor.locale_name}
                            </h2>

                            <p>
                                {
                                    prescription.doctor.doctor_profile
                                        ?.locale_title
                                }
                            </p>
                        </div>

                        {/* Hospital */}
                        <div className="text-center">
                            <h2 className="font-bold text-green-600">
                                OMEGA HOSPITAL
                            </h2>
                        </div>

                        {/* Doctor English */}
                        <div className="text-right">
                            <h2 className="text-xl font-bold">
                                {prescription.doctor.name}
                            </h2>

                            <p>{prescription.doctor.doctor_profile?.title}</p>

                            <p>
                                Licence:
                                {prescription.doctor.doctor_profile?.licence_no}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="mt-4 flex border-y py-2 text-sm">
                    <div className="flex-1">
                        <strong>Name:</strong> {prescription.patient.name}
                    </div>

                    <div className="w-32">
                        <strong>Age:</strong> {prescription.patient.age}{' '}
                        {prescription.patient.age_type}
                    </div>

                    <div className="w-24">
                        <strong>Sex:</strong> {prescription.patient.gender}
                    </div>

                    <div className="w-40 text-right">
                        <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Body */}
                <div className="flex min-h-[700px]">
                    {/* Left Side */}
                    <div className="w-1/3 border-r p-4">
                        <div>
                            <h3 className="font-bold">Chief Complaints</h3>

                            <p className="mt-2">
                                {prescription.chief_complaint}
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold">Examinations</h3>

                            {prescription.examinations.map((exam) => (
                                <div key={exam.id}>{exam.name}</div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold">Investigations</h3>

                            {prescription.tests.map((test) => (
                                <div key={test.id}>{test.name}</div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-2/3 p-4">
                        <div className="font-serif text-3xl">Rx</div>

                        <div className="mt-4 space-y-2">
                            {prescription.medicines.map((medicine, index) => (
                                <div
                                    key={medicine.id}
                                    className="flex items-start pb-2 text-sm"
                                >
                                    <div className="mr-2 font-semibold">
                                        {index + 1}.
                                    </div>

                                    <div className="flex-1">
                                        <span className="font-bold">
                                            {medicine.name}
                                        </span>

                                        <span className="ml-3">
                                            {Array.isArray(medicine.pivot.doses)
                                                ? medicine.pivot.doses.join(
                                                      ' - ',
                                                  )
                                                : medicine.pivot.doses}
                                        </span>

                                        <span className="ml-3">
                                            {medicine.pivot.duration}{' '}
                                            {medicine.pivot.duration_type}
                                        </span>

                                        {medicine.pivot.instructions && (
                                            <span className="ml-3 text-gray-600">
                                                ({medicine.pivot.instructions})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {prescription.next_visit && (
                            <div className="mt-12 text-right">
                                {prescription.next_visit} দিন পর দেখা করবেন।
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t py-4 text-center text-sm">
                    {prescription.hospital.name}
                </div>
            </div>
        </>
    );
}
