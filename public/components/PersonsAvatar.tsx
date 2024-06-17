import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

interface AvatarProps {
    outlanderNo: string;
    picpath: string
}

const CustomAvatar: React.FC<AvatarProps> = ({ outlanderNo, picpath }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:5052/file/persons/${outlanderNo}/picpath/${picpath}`);
                if (response.ok) {
                    setImageSrc(response.url);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [outlanderNo, picpath]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error || !imageSrc) {
        return <Avatar>{outlanderNo.charAt(0)}</Avatar>;
    }

    return <Avatar src={imageSrc} />;
};

export default CustomAvatar;
