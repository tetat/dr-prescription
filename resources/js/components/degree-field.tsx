import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Degree, Institute } from '@/types';
import { X } from 'lucide-react';

type DegreeProps = {
    degree_id: number | string;
    institute_id: number | string;
    passing_year: string;
}


type Props = {
    degrees: DegreeProps[];
    setDegrees: (degrees: DegreeProps[]) => void;
    degreeOptions: Degree[];
    instituteOptions: Institute[];
};

const DegreeField = ({
    degrees,
    setDegrees,
    degreeOptions,
    instituteOptions,
}: Props) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1970 }, (_, i) => currentYear - i);

    const updateDegree = (
        index: number,
        key: keyof DegreeProps,
        value: string
    ) => {
        const updated = [...degrees];
        updated[index][key] = value;
        setDegrees(updated);
    };

    const addDegree = () => {
        setDegrees([
            ...degrees,
            { degree_id: '', institute_id: '', passing_year: '' },
        ]);
    };

    const removeDegree = (index: number) => {
        setDegrees(degrees.filter((_, i) => i !== index));
    };

    return (
        <>
            {degrees.map((degree, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-between gap-1 w-11/12">

                        {/* Degree */}
                        < Select
                            value={degree.degree_id?.toString()}
                            onValueChange={(value) =>
                                updateDegree(index, 'degree_id', value)
                            }
                        >
                            <SelectTrigger className="w-4/12 h-9">
                                <SelectValue placeholder="Select a Degree" />
                            </SelectTrigger>
                            <SelectContent>
                                {degreeOptions.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id.toString()}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select >

                        {/* Institute */}
                        < Select
                            value={degree.institute_id?.toString()}
                            onValueChange={(value) =>
                                updateDegree(index, 'institute_id', value)
                            }
                        >
                            <SelectTrigger className="w-5/12 h-9">
                                <SelectValue placeholder="Select an Institute" />
                            </SelectTrigger>
                            <SelectContent>
                                {instituteOptions.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id.toString()}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select >

                        {/* Passing Year */}
                        < Select
                            value={degree.passing_year}
                            onValueChange={(value) =>
                                updateDegree(index, 'passing_year', value)
                            }
                        >
                            <SelectTrigger className="w-3/12 h-9">
                                <SelectValue placeholder="Passing Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select >
                    </div>

                    {/* Remove */}
                    < Button
                        type="button"
                        onClick={() => removeDegree(index)}
                        className="bg-red-500 w-10 h-9 text-white hover:bg-red-600 "
                    >
                        <X />
                    </Button >
                </div >
            ))}

            {/* Add */}
            <Button
                type="button"
                onClick={addDegree}
                className="bg-gray-700 text-white"
            >
                Add Degree
            </Button>
        </>
    );
};

export default DegreeField;
