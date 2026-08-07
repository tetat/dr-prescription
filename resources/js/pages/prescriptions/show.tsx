import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/prescriptions';
import { MedicineWithPMPivot, SelectOption } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface ExaminationProps {
    name: string;
    abbreviation: string;
    id: number;
    pivot: {
        result: string;
        interpretation: string;
    };
}

interface TestsProps {
    name: string;
    id: number;
    pivot: {
        result: string;
    };
}

interface Props {
    prescription: {
        id: number;
        code: string;
        doctor: SelectOption;
        patient: SelectOption;
        hospital: SelectOption;

        consultation_fee: string;
        next_visit: number;

        medicines: MedicineWithPMPivot[];
        tests: TestsProps[];
        examinations: ExaminationProps[];
    };
}

const PrescriptionShow = ({ prescription }: Props) => {
    const stringToArray = (
        data: string | number[] | null | undefined,
    ): number[] => {
        if (!data) return [];

        if (Array.isArray(data)) return data;

        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    };

    const breadcrumbsData = [
        { title: 'Prescriptions', href: index().url },
        { title: 'Prescription Details', href: '#' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`Prescription #${prescription.id}`} />

            <div className="mx-auto mt-6 w-2xl space-y-6 p-4">
                {/* BASIC INFO */}
                <div className="rounded-xl border p-5">
                    <h3 className="mb-4 font-semibold uppercase">Basic Information</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Code</Label>
                            <p className="font-medium">{prescription.code}</p>
                        </div>

                        <div className="flex justify-between">
                            <Label>Doctor</Label>
                            <p>{prescription.doctor?.name ?? '-'}</p>
                        </div>

                        <div className="flex justify-between">
                            <Label>Patient</Label>
                            <p>{prescription.patient?.name ?? '-'}</p>
                        </div>

                        <div className="flex justify-between">
                            <Label>Hospital</Label>
                            <p>{prescription.hospital?.name ?? '-'}</p>
                        </div>

                        <div className="flex justify-between">
                            <Label>Consultation Fee</Label>
                            <p>{prescription.consultation_fee}</p>
                        </div>

                        <div className="flex justify-between">
                            <Label>Next Visit (days)</Label>
                            <p>{prescription.next_visit ?? 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* MEDICINES */}
                <div className="rounded-xl border p-5">
                    <h3 className="font-semibold uppercase">Medicines</h3>

                    <div className="mt-3 space-y-4">
                        {prescription.medicines.map((m, index) => (
                            <div key={index} className="rounded-lg border p-4">
                                <div className="grid grid-cols-[140px_1fr] gap-y-3">
                                    <Label>Medicine</Label>
                                    <p className="font-medium">{m.name}</p>

                                    <Label>Duration</Label>
                                    <p>
                                        {m.pivot.duration} {m.pivot.duration_type}
                                    </p>

                                    <Label>Dosage</Label>
                                    <div className="flex items-center gap-2">
                                        {stringToArray(m.pivot.doses).map((dose, i, arr) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span>{dose}</span>

                                                {i < arr.length - 1 && (
                                                    <span className="text-muted-foreground">
                                                        +
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <Label>Instructions</Label>
                                    <p>{m.pivot.instructions || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TESTS */}
                <div className="rounded-xl border p-5">
                    <Label>Tests</Label>

                    <div className="mt-2 space-y-2">
                        {prescription.tests.length ? (
                            prescription.tests.map((t) => (
                                <div
                                    key={t.id}
                                    className="flex items-center justify-between border-b pb-1 last:border-b-0"
                                >
                                    <span>{t.name}</span>

                                    <span className="text-muted-foreground">
                                        {t.pivot?.result ?? 'Waiting'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No tests</p>
                        )}
                    </div>
                </div>

                {/* EXAMINATIONS */}
                <div className="rounded-xl border p-5">
                    <Label>Examinations</Label>

                    <div className="mt-3 space-y-3">
                        {prescription.examinations.length > 0 ? (
                            prescription.examinations.map((exam) => (
                                <div
                                    key={exam.id}
                                    className="border-b pb-2 last:border-b-0 last:pb-0"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            {exam.abbreviation ?? exam.name}
                                        </span>

                                        <span>
                                            {exam.pivot?.result || "—"}
                                        </span>
                                    </div>

                                    {exam.pivot?.interpretation && (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {exam.pivot.interpretation}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No examinations
                            </p>
                        )}
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between pt-2">
                    <Link href={index().url}>
                        <Button variant="secondary" className="px-6">
                            Back
                        </Button>
                    </Link>

                    <Link href={edit(prescription.id).url}>
                        <Button className="bg-green-600 px-6 hover:bg-green-700">
                            Edit Prescription
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default PrescriptionShow;
