import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogPortal,
} from '@/components/ui/dialog';
import PaymentForm from './payment-form';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    prescription: any;
    data: any;
    setData: any;
    errors: any;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function PaymentModal({
    open,
    setOpen,
    prescription,
    data,
    setData,
    errors,
    processing,
    onSubmit,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <DialogContent className="fixed z-[9999] max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create Payment</DialogTitle>
                    </DialogHeader>

                    {prescription ? (
                        <PaymentForm
                            readonlyPrescription={prescription}
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={onSubmit}
                            isEditMode={false}
                        />
                    ) : null}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
