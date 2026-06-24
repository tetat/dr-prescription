import {
    PrintExaminationProps,
    PrintHospitalProps,
    PrintMedicineProps,
    PrintPatientProps,
    PrintTestProps,
} from '@/types';
import { Head } from '@inertiajs/react';
import { HospitalIcon } from 'lucide-react';
// import { useEffect } from 'react';

interface Payment {
    id: number;
    amount: number;
    method: string;
    status: string;
}

interface Institute {
    id: number;
    name: string;
    locale_name: string;
    abbreviation: string;
    locale_abbreviation: string;
}

interface Degree {
    id: number;
    abbreviation: string;
    locale_abbreviation: string;
}

interface DegreeDoctor {
    id: number;
    passing_year: string;

    degree: Degree;
    institute: Institute;
}

interface Speciality {
    id: number;
    name: string;
    locale_name: string;
    abbreviation: string;
    locale_abbreviation: string;
}

interface Doctor {
    id: number;
    name: string;
    locale_name: string;

    doctor_profile?: {
        title: string;
        locale_title: string;
        bio: string;
    };

    degree_doctors: DegreeDoctor[];
    specialities: Speciality[];
}

interface Prescription {
    id: number;
    code: string;
    chief_complaint: string;
    consultation_fee: number;
    remaining_fee: number;
    next_visit: string | null;

    doctor: Doctor;
    patient: PrintPatientProps;
    hospital: PrintHospitalProps;

    medicines: PrintMedicineProps[];
    examinations: PrintExaminationProps[];
    tests: PrintTestProps[];
    payments: Payment[];
}

interface Props {
    prescription: Prescription;
}

export default function PrescriptionPrint({ prescription }: Props) {
    // useEffect(() => {
    //     setTimeout(() => window.print(), 500);
    // }, []);

    const formatDoses = (doses: any) => {
        if (Array.isArray(doses)) {
            return doses.join(' + ');
        }

        if (typeof doses === 'string') {
            return doses.replace(/\[|\]/g, '').split(',').join(' + ');
        }

        return '';
    };
    // console.log(prescription);

    return (
        <>
            <Head title={`Prescription ${prescription.code}`} />

            <div className="min-h-screen bg-white text-black">
                {/* Header */}
                <div className="pb-1 text-center">
                    <h1 className="text-3xl font-bold">
                        {prescription.hospital.name}
                    </h1>

                    <div className="mt-4 grid grid-cols-3">
                        {/* Doctor Bengali */}
                        <div className="text-left">
                            <h2 className="text-xl font-bold">
                                {
                                    prescription.doctor.doctor_profile
                                        ?.locale_title
                                }{' '}
                                {prescription.doctor.locale_name}
                            </h2>

                            <p className="text-sm">
                                {prescription.doctor.degree_doctors
                                    .map(
                                        (item) =>
                                            `${item.degree.locale_abbreviation} (${item.institute.locale_abbreviation})`,
                                    )
                                    .join(', ')}
                            </p>

                            {prescription.doctor.specialities.length > 0 && (
                                <p className="text-sm text-gray-600">
                                    {prescription.doctor.specialities
                                        .map(
                                            (speciality) =>
                                                `${speciality.locale_name}${
                                                    speciality.locale_abbreviation
                                                        ? ` (${speciality.locale_abbreviation})`
                                                        : ''
                                                }`,
                                        )
                                        .join(', ')}
                                </p>
                            )}
                        </div>

                        {/* Hospital */}
                        <div className="flex flex-col items-center text-center">
                            {prescription.hospital.logo ? (
                                <img
                                    src={prescription.hospital.logo}
                                    alt={prescription.hospital.name}
                                    className="h-12 w-auto object-contain"
                                />
                            ) : (
                                <HospitalIcon className="h-12 w-auto object-contain" />
                            )}
                        </div>

                        {/* Doctor English */}
                        <div className="text-right">
                            <h2 className="text-xl font-bold">
                                {prescription.doctor.doctor_profile?.title}{' '}
                                {prescription.doctor.name}
                            </h2>

                            <p className="text-sm">
                                {prescription.doctor.degree_doctors
                                    .map(
                                        (item) =>
                                            `${item.degree.abbreviation} (${item.institute.abbreviation})`,
                                    )
                                    .join(', ')}
                            </p>

                            {prescription.doctor.specialities.length > 0 && (
                                <p className="text-sm text-gray-600">
                                    {prescription.doctor.specialities
                                        .map(
                                            (speciality) =>
                                                `${speciality.name}${
                                                    speciality.abbreviation
                                                        ? ` (${speciality.abbreviation})`
                                                        : ''
                                                }`,
                                        )
                                        .join(', ')}
                                </p>
                            )}
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
                                            {formatDoses(medicine.pivot.doses)}
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
