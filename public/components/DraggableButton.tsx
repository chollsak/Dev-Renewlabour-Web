import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const DraggableButtonRoot = styled(Button)(({ theme }) => ({
    position: 'fixed',
    bottom: '20px',
    right: '5px',
    cursor: 'grab',
    '&.dragging': {
        cursor: 'grabbing',
    },
}));

const ModalContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '20px', // Optional: adds space between the items
}));

const DraggableButton: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const pos = useRef({ x: 0, y: 0 });
    const dragging = useRef(false);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const button = buttonRef.current;

        if (!button) return;

        const onMouseMove = (e: MouseEvent) => {
            if (dragging.current) {
                const dx = e.clientX - pos.current.x;
                const dy = e.clientY - pos.current.y;
                button.style.transform = `translate(${dx}px, ${dy}px)`;
            }
        };

        const onMouseUp = () => {
            dragging.current = false;
            button.classList.remove('dragging');
        };

        const onMouseDown = (e: MouseEvent) => {
            dragging.current = true;
            pos.current = { x: e.clientX, y: e.clientY };
            button.classList.add('dragging');
        };

        button.addEventListener('mousedown', onMouseDown as unknown as EventListener);
        document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
        document.addEventListener('mouseup', onMouseUp as unknown as EventListener);

        return () => {
            button.removeEventListener('mousedown', onMouseDown as unknown as EventListener);
            document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
            document.removeEventListener('mouseup', onMouseUp as unknown as EventListener);
        };
    }, []);

    return (
        <>
            <DraggableButtonRoot
                ref={buttonRef}
                className="text-white font-bold py-2 px-4 rounded"
                onClick={handleOpen}
            >
                <Image src="/Logo/linelogo.png" width={50} height={50} alt="Logo" />
            </DraggableButtonRoot>
            <Modal
                open={open}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <ModalContent>
                    <Image src="/Logo/linenotilogo.jpg" width={300} height={300} alt="Modal Content" />
                    <Box style={{ backgroundColor: '#48c404', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography
                            className='text-center'
                            style={{
                                color: 'white',
                                padding: '20px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            เเสกน OR Code เพื่อรับการเเจ้งเตือนของเรา
                        </Typography>
                        <Image src="/Logo/logo.png" alt="Modal Content" height={60} width={200} style={{ height: '60px', backgroundColor: 'black', padding: '10px', marginTop: '5px', borderRadius: '20px' }} />
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DraggableButton;
