export type DoctorProfile = {
    user_id: number;
    title: string;
    locale_title: string;
    licence_no: string;
    bio: string;
};

export type DoctorSettingProps = {
    id: number;
    consultation_fee: number | '';
    followup_discount: number | '';
    emergency_fee: number | '';
    followup_valid_days: number | '';
};
