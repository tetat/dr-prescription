import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface PrescriptionOption {
    id: number;
    code: string;
    consultation_fee: number;
}

interface PaymentFormProps {
    prescription_id: string;
    amount: string;
    method: string;
    status: string;
    paid_at: string;
}

interface Props {
    data: PaymentFormProps;
    setData: any;
    errors: Record<string, any>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    prescriptions: PrescriptionOption[];
    isEditMode: boolean;
}

const PaymentForm = ({
    prescriptions,
    data,
    setData,
    errors,
    processing,
    onSubmit,
    isEditMode,
}: Props) => {
    const handlePrescriptionChange = (value: string) => {
        const prescription = prescriptions.find(
            (p) => p.id.toString() === value,
        );

        setData((prev: any) => ({
            ...prev,
            prescription_id: value,
            amount: prescription?.consultation_fee?.toString() ?? '',
        }));
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Prescription */}
            <div>
                <Label>
                    Prescription <span className="text-red-500">*</span>
                </Label>

                <Select
                    value={data.prescription_id}
                    onValueChange={handlePrescriptionChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Prescription" />
                    </SelectTrigger>

                    <SelectContent>
                        {prescriptions.map((prescription) => (
                            <SelectItem
                                key={prescription.id}
                                value={prescription.id.toString()}
                            >
                                {prescription.code}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <InputError message={errors.prescription_id} />
            </div>

            {/* Amount */}
            <div>
                <Label>
                    Amount <span className="text-red-500">*</span>
                </Label>

                <Input
                    type="number"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                />

                <InputError message={errors.amount} />
            </div>

            {/* Method */}
            <div>
                <Label>
                    Method <span className="text-red-500">*</span>
                </Label>

                <Select
                    value={data.method}
                    onValueChange={(value) => setData('method', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Method" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="bKash">bKash</SelectItem>
                        <SelectItem value="Nagad">Nagad</SelectItem>
                        <SelectItem value="Bank">Bank</SelectItem>
                    </SelectContent>
                </Select>

                <InputError message={errors.method} />
            </div>

            {/* Status */}
            <div>
                <Label>
                    Status <span className="text-red-500">*</span>
                </Label>

                <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                </Select>

                <InputError message={errors.status} />
            </div>

            {/* Paid At */}
            <div>
                <Label>Paid At</Label>

                <Input
                    type="datetime-local"
                    value={data.paid_at}
                    onChange={(e) => setData('paid_at', e.target.value)}
                />

                <InputError message={errors.paid_at} />
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                {processing
                    ? 'Loading...'
                    : isEditMode
                      ? 'Update Payment'
                      : 'Create Payment'}
            </Button>
        </form>
    );
};

export default PaymentForm;
