export type ExaminationProps = {
    id: number;
    name: string;
    abbreviation: string;
    unit: string;
};

export type PrintExaminationProps = {
    id: number;
    name: string;
    pivot: {
        result?: string;
        interpretation?: string;
    };
};
