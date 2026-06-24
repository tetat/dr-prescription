export type Hospital = {
    id: number;
    name: string;
    locale_name: string;
    full_name: string;
    locale_full_name: string;
    moto: string;
    locale_moto: string;
    address: string;
    locale_address: string;
};

export type PrintHospitalProps = {
    id: number;
    name: string;
    logo: string;
};
