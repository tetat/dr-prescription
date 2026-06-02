import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/prescriptions';
import { MedicineWithPMPivot, SelectOption } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    prescription: {
        id: number;
        doctor: SelectOption;
        patient: SelectOption;
        hospital: SelectOption;

        consultation_fee: string;
        next_visit: number;

        medicines: MedicineWithPMPivot[];
        tests: SelectOption[];
        examinations: SelectOption[];
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
                <div className="space-y-3 rounded-xl border p-5">
                    <div>
                        <Label>Doctor</Label>
                        <p>{prescription.doctor?.name ?? '-'}</p>
                    </div>

                    <div>
                        <Label>Patient</Label>
                        <p>{prescription.patient?.name ?? '-'}</p>
                    </div>

                    <div>
                        <Label>Hospital</Label>
                        <p>{prescription.hospital?.name ?? '-'}</p>
                    </div>

                    <div>
                        <Label>Consultation Fee</Label>
                        <p>{prescription.consultation_fee}</p>
                    </div>

                    <div>
                        <Label>Next Visit (days)</Label>
                        <p>{prescription.next_visit ?? 'N/A'}</p>
                    </div>
                </div>

                {/* MEDICINES */}
                <div className="rounded-xl border p-5">
                    <Label>Medicines</Label>

                    <div className="mt-3 space-y-3">
                        {prescription.medicines.map((m, index) => (
                            <div key={index} className="rounded-md border p-3">
                                <p className="font-semibold">{m.name}</p>

                                <p className="text-sm text-gray-600">
                                    Duration: {m.pivot.duration}{' '}
                                    {m.pivot.duration_type}
                                </p>

                                <div className="flex items-center gap-2">
                                    {stringToArray(m.pivot.doses).map(
                                        (dose, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <p>{dose}</p>

                                                {i !==
                                                    stringToArray(m.pivot.doses)
                                                        .length -
                                                        1 && (
                                                    <span className="text-muted-foreground">
                                                        +
                                                    </span>
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>

                                {m.pivot.instructions && (
                                    <p className="text-sm text-gray-600">
                                        Instructions: {m.pivot.instructions}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* TESTS */}
                <div className="rounded-xl border p-5">
                    <Label>Tests</Label>
                    <div className="mt-2 space-y-1">
                        {prescription.tests.length ? (
                            prescription.tests.map((t) => (
                                <p key={t.id}>{t.name}</p>
                            ))
                        ) : (
                            <p className="text-gray-500">No tests</p>
                        )}
                    </div>
                </div>

                {/* EXAMINATIONS */}
                <div className="rounded-xl border p-5">
                    <Label>Examinations</Label>
                    <div className="mt-2 space-y-1">
                        {prescription.examinations.length ? (
                            prescription.examinations.map((e) => (
                                <p key={e.id}>{e.name}</p>
                            ))
                        ) : (
                            <p className="text-gray-500">No examinations</p>
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
