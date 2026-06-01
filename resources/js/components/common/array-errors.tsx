import InputError from '@/components/input-error';

interface Props {
    errors: Record<string, string | undefined>;
    prefix: string;
}

const ArrayErrors = ({ errors, prefix }: Props) => {
    return (
        <>
            {Object.entries(errors)
                .filter(([key]) => key.startsWith(prefix))
                .map(([key, message]) => (
                    <InputError key={key} message={message} />
                ))}
        </>
    );
};

export default ArrayErrors;
