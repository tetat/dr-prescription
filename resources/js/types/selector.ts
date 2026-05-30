export type SelectOption = {
    id: number;
    name: string;
};

export type FormSelector = {
    id: number;
    short_name: string;
};

export type MedicineSelectOption = SelectOption & {
    strength: string;
    search_text: string;
    group: SelectOption;
    forms: FormSelector[];
};
