import { useEffect, useState } from 'react';

interface ImagePreviewProps {
    file: File | null;
    className?: string;
    fallback?: string; // optional existing image (edit mode)
}

const ImagePreview = ({ file, className, fallback }: ImagePreviewProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file || !(file instanceof File)) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const src = preview || fallback;


    if (!src) return null;

    return (
        <img
            src={src}
            alt="Preview"
            className={
                className ||
                'h-24 w-40 rounded-md border object-cover'
            }
        />
    );
};

export default ImagePreview;