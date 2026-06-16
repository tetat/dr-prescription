import { Link, router } from '@inertiajs/react';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

interface PathProps {
    show: string;
    edit: string;
    destroy: string;
}

const TableActionModal = ({ show, edit, destroy }: PathProps) => {
    const handleDelete = () => {
        router.delete(destroy, {
            onBefore: () => confirm('Are you sure you want to delete?'),
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <MoreVertical size={18} />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Actions</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <Link
                        href={show}
                        className="flex items-center gap-2 rounded bg-slate-400 p-2 text-white hover:bg-slate-600"
                    >
                        <Eye size={18} />
                        View
                    </Link>

                    <Link
                        href={edit}
                        className="flex items-center gap-2 rounded bg-green-500 p-2 text-white hover:bg-green-700"
                    >
                        <Pencil size={18} />
                        Edit
                    </Link>

                    <Button
                        variant="destructive"
                        className="justify-start gap-2"
                        onClick={handleDelete}
                    >
                        <Trash2 size={18} />
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TableActionModal;
