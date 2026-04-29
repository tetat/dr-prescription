import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FilterProps {
    search?: string;
    perPage?: string;
}

interface Props {
    route: string;
    data: FilterProps;
    setData: (key: keyof FilterProps, value: string) => void;
    placeHolderMsg?: string;
    delay?: number;
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

const TableSearch = ({
    data,
    setData,
    route,
    placeHolderMsg = 'Users',
    delay = 200,
}: Props) => {
    const searchRequest = useMemo(
        () =>
            debounce((value: string) => {
                const query = {
                    ...(value && { search: value }),
                    ...(data.perPage && { perPage: data.perPage }),
                };

                router.get(route, query, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }, delay),
        [route, data.perPage, delay],
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);
        searchRequest(value);
    };

    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');
        searchRequest('');
    };

    return (
        <div className="relative w-1/3">
            <Input
                value={data.search || ''}
                onChange={handleSearch}
                className="h-10 pr-10"
                type="text"
                placeholder={`Search ${placeHolderMsg}...`}
                name="search"
            />

            <Button
                onClick={handleReset}
                className="absolute top-1/2 right-2 size-8 -translate-y-1/2 rounded bg-red-500 p-1 hover:bg-red-600"
                disabled={!data.search}
            >
                <X size={16} />
            </Button>
        </div>
    );
};

export default TableSearch;
