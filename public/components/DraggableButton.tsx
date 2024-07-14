// components/DraggableButton.tsx
import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '20px',
        right: '5px',
        cursor: 'grab',
    },
    dragging: {
        cursor: 'grabbing',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

const DraggableButton: React.FC = () => {
    const classes = useStyles();
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
            button.classList.remove(classes.dragging);
        };

        const onMouseDown = (e: MouseEvent) => {
            dragging.current = true;
            pos.current = { x: e.clientX, y: e.clientY };
            button.classList.add(classes.dragging);
        };

        button.addEventListener('mousedown', onMouseDown as unknown as EventListener);
        document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
        document.addEventListener('mouseup', onMouseUp as unknown as EventListener);

        return () => {
            button.removeEventListener('mousedown', onMouseDown as unknown as EventListener);
            document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
            document.removeEventListener('mouseup', onMouseUp as unknown as EventListener);
        };
    }, [classes.dragging]);

    return (
        <>
            <Button

                ref={buttonRef}
                className={`${classes.root} text-white font-bold py-2 px-4 rounded`}
                onClick={handleOpen}
            >
                <img src="/logo/linelogo.png" width={'50px'} height='50px' alt="" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <Box className="flex" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo/linenotilogo.jpg" alt="Modal Content" className={classes.image} style={{ height: '300px' }} />
                    <div style={{ backgroundColor: '#48c404', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                        <img src="/logo/logo.png" alt="Modal Content" className={classes.image} style={{ height: '60px', backgroundColor: 'black', padding: '10px', marginTop: '5px', borderRadius: '20px' }} />
                    </div>
                </Box>




            </Modal>
        </>
    );
};

export default DraggableButton;
