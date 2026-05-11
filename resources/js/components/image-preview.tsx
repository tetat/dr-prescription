import { useEffect, useMemo } from 'react';

interface ImagePreviewProps {
    file: File | null;
    className?: string;
    fallback?: string;
}

const ImagePreview = ({ file, className, fallback }: ImagePreviewProps) => {
    const preview = useMemo(() => {
        if (!file || !(file instanceof File)) return null;
        return URL.createObjectURL(file);
    }, [file]);

    const src = preview || fallback;

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    if (!src) return null;

    return (
        <img
            src={src}
            alt="Preview"
            className={className || 'h-24 w-40 rounded-md border object-cover'}
        />
    );
};

export default ImagePreview;