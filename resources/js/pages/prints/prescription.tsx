import {
    Phone,
    PrintExaminationProps,
    PrintHospitalProps,
    PrintMedicineProps,
    PrintPatientProps,
    PrintTestProps,
} from '@/types';
import { Head } from '@inertiajs/react';
import { HospitalIcon } from 'lucide-react';
import HospitalFooter from './hospital-footer';
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

interface HospitalProps extends PrintHospitalProps {
    phones: Phone[];
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
    hospital: HospitalProps;

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

    const changeNumberToLocale = (num: string | number) =>
        String(num).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
    // console.log(prescription);

    return (
        <>
            <Head title={`Prescription ${prescription.code}`} />

            <div className="mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white px-6 py-4 text-black">
                {/* Header */}
                <div className="pb-2 text-center">
                    <h1 className="text-3xl font-bold">
                        {prescription.hospital.name}
                    </h1>

                    <div className="mt-3 grid grid-cols-3">
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
                        <div className="flex items-center justify-center">
                            {prescription.hospital.logo_url ? (
                                <img
                                    src={prescription.hospital.logo_url}
                                    alt={prescription.hospital.name}
                                    className="h-16 w-auto object-contain"
                                />
                            ) : (
                                <HospitalIcon className="h-14 w-14" />
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
                <div className="mt-3 flex border-y py-2 text-sm">
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

                {/* Main Body */}
                <div className="flex flex-1">
                    {/* Left */}
                    <div className="flex w-1/3 flex-col justify-between border-r p-4 text-sm">
                        <div className="flex flex-1 flex-col">
                            <h3 className="font-semibold uppercase">
                                Chief Complaints
                            </h3>

                            <div className="mt-2">
                                <p>{prescription.chief_complaint}</p>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col">
                            <h3 className="font-semibold uppercase">
                                Examinations
                            </h3>

                            <div className="mt-2">
                                {prescription.examinations.map((exam) => (
                                    <div key={exam.id}>{exam.name}</div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col">
                            <h3 className="font-semibold uppercase">
                                Investigations
                            </h3>

                            <div className="mt-2">
                                {prescription.tests.map((test) => (
                                    <div key={test.id}>{test.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex w-2/3 flex-col px-4 py-2">
                        <div className="font-serif text-xl">Rx,</div>

                        <div className="mt-1 flex-1">
                            <div className="space-y-1">
                                {prescription.medicines.map(
                                    (medicine, index) => (
                                        <div key={medicine.id}>
                                            <div className="text-sm font-semibold">
                                                {index + 1}. {medicine.name}
                                            </div>

                                            <div className="mt-1 ml-6 flex text-sm text-gray-700">
                                                <span className="w-24">
                                                    {formatDoses(
                                                        medicine.pivot.doses,
                                                    )}
                                                </span>

                                                <span className="w-24">
                                                    {medicine.pivot.duration}{' '}
                                                    {
                                                        medicine.pivot
                                                            .duration_type
                                                    }
                                                </span>

                                                <span className="flex-1">
                                                    {
                                                        medicine.pivot
                                                            .instructions
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {prescription.next_visit && (
                            <div className="border-t pt-3 text-right text-sm">
                                <span className="font-medium">
                                    {changeNumberToLocale(
                                        prescription.next_visit,
                                    )}{' '}
                                    দিন পর দেখা করবেন।
                                </span>

                                {/* <br />

                                <span className="text-gray-600">
                                    পরবর্তী সাক্ষাতের সময় ব্যবস্থাপত্রটি সাথে
                                    নিয়ে আসবেন।
                                </span> */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto">
                    <HospitalFooter
                        hospitalName={prescription.hospital.name}
                        hospitalLogo={prescription.hospital.logo_url}
                        phones={prescription.hospital.phones}
                    />
                </div>
            </div>
        </>
    );
}
