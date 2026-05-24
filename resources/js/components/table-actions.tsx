import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface PathProps {
    show: string;
    edit: string;
    destroy: string;
}

const TableActions = ({ show, edit, destroy }: PathProps) => {
    const handleDelete = () => {
        router.delete(destroy, {
            onBefore: () => confirm('Are you sure you want to delete?'),
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Link
                href={show}
                className="rounded bg-slate-400 p-2 text-white hover:bg-slate-600"
            >
                <Eye size={18} />
            </Link>

            <Link
                href={edit}
                className="rounded bg-green-500 p-2 text-white hover:bg-green-700"
            >
                <Pencil size={18} />
            </Link>

            <Button size="icon" variant="destructive" onClick={handleDelete}>
                <Trash2 />
            </Button>
        </div>
    );
};

export default TableActions;
