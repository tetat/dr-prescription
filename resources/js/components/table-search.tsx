import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
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
    delay?: number;
}

const TableSearch = ({ data, setData, route, delay = 200 }: Props) => {
    const debounce = (fn: Function, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;

        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    };

    const searchRequest = debounce((value: string) => {
        const query = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),
        };

        router.get(route, query, {
            preserveState: true,
            preserveScroll: true,
        });
    }, delay);

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
        <>
            <Input
                value={data.search}
                onChange={handleSearch}
                className="h-10 w-1/3"
                type="text"
                placeholder="Search Roles..."
                name="search"
            />

            <Button
                onClick={handleReset}
                className="size-8 cursor-pointer bg-red-600 hover:bg-red-500"
            >
                <X size={16} />
            </Button>
        </>
    );
};

export default TableSearch;
