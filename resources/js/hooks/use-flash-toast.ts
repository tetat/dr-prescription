import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type FlashProps = {
    success?: string | null;
    error?: string | null;
    deleted?: string | null;
};

export function useFlashToast() {
    const { flash } = usePage<{ flash: FlashProps }>().props;

    useEffect(() => {
        if (!flash) return;

        if (flash.success) {
            toast.success(flash.success, { id: 'flash-success' });
        }

        if (flash.deleted) {
            toast.warning(flash.deleted, { id: 'flash-deleted' });
        }

        if (flash.error) {
            toast.error(flash.error, { id: 'flash-error' });
        }
    }, [flash]);
}
