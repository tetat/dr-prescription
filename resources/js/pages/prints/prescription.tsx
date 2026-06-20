import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import { useEffect } from 'react';

interface Medicine {
    id: number;
    name: string;
    pivot: {
        duration: string;
        duration_type: string;
        doses: string;
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
    doctor_profile?: {
        title: string;
        licence_no: string;
        bio: string;
    };
}

interface Patient {
    id: number;
    name: string;
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
    payments: Payment[];
}

interface Props {
    prescription: Prescription;
}

export default function PrescriptionPrint({ prescription }: Props) {
    useEffect(() => {
        // auto print when page opens
        window.print();
    }, []);

    return (
        <AppLayout>
            <Head title={`Prescription ${prescription.code}`} />

            <div className="mx-auto max-w-4xl bg-white p-6 text-black print:p-0">
                {/* Header */}
                <div className="mb-6 border-b pb-4 text-center">
                    <h1 className="text-2xl font-bold">Prescription Receipt</h1>
                    <p className="text-sm text-gray-600">
                        Code: {prescription.code}
                    </p>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h2 className="font-semibold">Doctor</h2>
                        <p>{prescription.doctor.name}</p>
                        <p>{prescription.doctor.doctor_profile?.title}</p>
                        <p>
                            License:{' '}
                            {prescription.doctor.doctor_profile?.licence_no}
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold">Patient</h2>
                        <p>{prescription.patient.name}</p>

                        <h2 className="mt-2 font-semibold">Hospital</h2>
                        <p>{prescription.hospital.name}</p>
                    </div>
                </div>

                {/* Complaint */}
                <div className="mt-4">
                    <h2 className="font-semibold">Chief Complaint</h2>
                    <p>{prescription.chief_complaint}</p>
                </div>

                {/* Medicines */}
                <div className="mt-6">
                    <h2 className="font-semibold">Medicines</h2>

                    <table className="mt-2 w-full border text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Duration</th>
                                <th className="border p-2">Doses</th>
                                <th className="border p-2">Instructions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {prescription.medicines.map((m) => (
                                <tr key={m.id}>
                                    <td className="border p-2">{m.name}</td>
                                    <td className="border p-2">
                                        {m.pivot.duration}{' '}
                                        {m.pivot.duration_type}
                                    </td>
                                    <td className="border p-2">
                                        {m.pivot.doses}
                                    </td>
                                    <td className="border p-2">
                                        {m.pivot.instructions}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment */}
                <div className="mt-6 text-sm">
                    <h2 className="font-semibold">Payment Summary</h2>

                    <p>Total Fee: {prescription.consultation_fee}</p>

                    <p>Remaining: {prescription.remaining_fee}</p>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center text-xs text-gray-500 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-white"
                    >
                        <Printer size={16} />
                        Print
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
