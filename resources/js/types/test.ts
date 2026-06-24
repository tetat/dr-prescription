export type TestProps = {
    id: number;
    name: string;
    description: string;
};

export type PrintTestProps = {
    id: number;
    name: string;
    pivot: {
        result?: string;
    };
};
