import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

interface AvatarProps {
    mem_id: string;
    m_picpath: string
}

const MembersAvatar: React.FC<AvatarProps> = ({ mem_id, m_picpath }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_FILE_API}/file/members/${mem_id}/picpath/${m_picpath}`);
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
    }, [mem_id, m_picpath]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error || !imageSrc) {
        return <Avatar sx={{ width: 200, height: 200 }} className='border-4 border-[#2074d4]' alt="No Picture" />;
    }

    return <Avatar src={imageSrc} sx={{ width: 200, height: 200 }} className='border-4 border-[#2074d4]' alt="No Picture" />;
};

export default MembersAvatar;
