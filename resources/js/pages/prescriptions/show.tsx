import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/prescriptions';
import { Head, Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
}

interface Hospital {
    id: number;
    name: string;
}

interface Medicine {
    id: number;
    name: string;
}

interface Test {
    id: number;
    name: string;
}

interface Examination {
    id: number;
    name: string;
}

interface Props {
    prescription: {
        id: number;
        doctor: User;
        patient: User;
        hospital: Hospital;
        consultation_fee: string;
        next_visit: number;
        medicines: Medicine[];
        tests: Test[];
        examinations: Examination[];
    };
}

const PrescriptionShow = ({ prescription }: Props) => {
    const breadcrumbsData = [
        {
            title: 'Prescriptions',
            href: index().url,
        },
        {
            title: 'Prescription Details',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Prescription #${prescription.id}`} />

            <div className="mx-auto mt-6 w-2xl space-y-6 p-4">
                {/* Basic Info */}
                <div className="space-y-3 rounded-xl border p-5">
                    <div>
                        <Label>Doctor</Label>
                        <p>{prescription.doctor?.name}</p>
                    </div>

                    <div>
                        <Label>Patient</Label>
                        <p>{prescription.patient?.name}</p>
                    </div>

                    <div>
                        <Label>Hospital</Label>
                        <p>{prescription.hospital?.name}</p>
                    </div>

                    <div>
                        <Label>Consultation Fee</Label>
                        <p>{prescription.consultation_fee}</p>
                    </div>

                    <div>
                        <Label>Next Visit (days)</Label>
                        <p>{prescription.next_visit}</p>
                    </div>
                </div>

                {/* Medicines */}
                <div className="rounded-xl border p-5">
                    <Label>Medicines</Label>
                    <div className="mt-2 space-y-1">
                        {prescription.medicines.map((m) => (
                            <p key={m.id}>{m.name}</p>
                        ))}
                    </div>
                </div>

                {/* Tests */}
                <div className="rounded-xl border p-5">
                    <Label>Tests</Label>
                    <div className="mt-2 space-y-1">
                        {prescription.tests.map((t) => (
                            <p key={t.id}>{t.name}</p>
                        ))}
                    </div>
                </div>

                {/* Examinations */}
                <div className="rounded-xl border p-5">
                    <Label>Examinations</Label>
                    <div className="mt-2 space-y-1">
                        {prescription.examinations.map((e) => (
                            <p key={e.id}>{e.name}</p>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                    <Link href={index().url}>
                        <Button
                            variant="secondary"
                            className="cursor-pointer px-6"
                        >
                            Back
                        </Button>
                    </Link>

                    <Link href={edit(prescription).url}>
                        <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                            Edit Prescription
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default PrescriptionShow;
