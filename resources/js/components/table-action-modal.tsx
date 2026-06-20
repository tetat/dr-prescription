import { Link, router } from '@inertiajs/react';
import {
    DollarSign,
    Eye,
    MoreVertical,
    Pencil,
    Printer,
    Trash2,
} from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';

interface PathProps {
    show: string;
    edit: string;
    destroy: string;
    onPay?: () => void;
    prescription_id?: number;
}

const TableActionModal = ({
    show,
    edit,
    destroy,
    onPay,
    prescription_id,
}: PathProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleDelete = () => {
        router.delete(destroy, {
            onBefore: () => confirm('Are you sure you want to delete?'),
        });
    };

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen(!open)}
            >
                <MoreVertical size={18} />
            </Button>

            {open && (
                <div className="fixed right-10 z-[9999] mt-2 flex w-40 flex-col gap-2 rounded border bg-white p-2 shadow">
                    <Link
                        href={show}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded bg-slate-400 px-2 py-1 text-sm text-white hover:bg-slate-600"
                    >
                        <Eye size={16} />
                        <span>View</span>
                    </Link>

                    <Link
                        href={edit}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-700"
                    >
                        <Pencil size={16} />
                        <span>Edit</span>
                    </Link>

                    <button
                        onClick={() => {
                            handleDelete();
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                    >
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </button>

                    {onPay && (
                        <button
                            onClick={() => {
                                onPay?.();
                                setOpen(false);
                            }}
                            className="hover:bg-blu flex w-full items-center gap-2 rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                        >
                            <DollarSign size={16} />
                            <span>Pay</span>
                        </button>
                    )}
                    {prescription_id && (
                        <Link
                            href={`/print/prescription/${prescription_id}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-700"
                        >
                            <Printer size={16} />
                            <span>Print</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default TableActionModal;
