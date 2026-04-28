import { Field, FieldLabel } from '@/components/ui/field';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Link } from '@inertiajs/react';

interface LinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: LinkType[];
    handlePerPageChange: (val: string) => void;
    perPage?: string;
}

export function Paginate({ links, handlePerPageChange, perPage }: Props) {
    return (
        <div className="flex items-center justify-between gap-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">
                    Rows per page
                </FieldLabel>
                <Select
                    onValueChange={handlePerPageChange}
                    defaultValue={perPage}
                >
                    <SelectTrigger
                        className="h-9 w-24"
                        id="select-rows-per-page"
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        avoidCollisions
                        collisionPadding={8}
                        className="max-h-60 overflow-y-auto"
                    >
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="-1">All</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    {links.map((link, i) => {
                        const label = link.label
                            .replace('&laquo;', '«')
                            .replace('&raquo;', '»');

                        if (label.includes('Previous')) {
                            return (
                                <PaginationItem key={i}>
                                    <Link
                                        href={link.url || '#'}
                                        className={
                                            !link.url
                                                ? 'pointer-events-none bg-slate-50 px-2 py-1 opacity-50'
                                                : 'rouned bg-slate-50 px-3 py-1 hover:bg-slate-100'
                                        }
                                    >
                                        {label}
                                    </Link>
                                </PaginationItem>
                            );
                        }

                        if (label.includes('Next')) {
                            return (
                                <PaginationItem key={i}>
                                    <Link
                                        href={link.url || '#'}
                                        className={
                                            !link.url
                                                ? 'pointer-events-none bg-slate-50 px-2 py-1 opacity-50'
                                                : 'rouned bg-slate-50 px-3 py-1 hover:bg-slate-100'
                                        }
                                    >
                                        {label}
                                    </Link>
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={i}>
                                <Link
                                    href={link.url || '#'}
                                    className={`rounded px-3 py-1 ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
