
'use client';
import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography
} from '@mui/material';

interface UserData {
    id: number;
    name: string;
    nickname: string;
    province: string;
    visa: number;
    passport: number;
    workpermit: number;
    '90DaysDoc': number;
}

const defaultData: UserData = {
    id: 0,
    name: '',
    nickname: '',
    province: '',
    visa: 0,
    passport: 0,
    workpermit: 0,
    '90DaysDoc': 0,
};

const UserForm: React.FC = () => {
    const [userData, setUserData] = useState<UserData>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitted data:', userData);
        // Here you can handle the submission to an API or another state
    };

    return (
        <Box sx={{ maxWidth: '90%', mx: "auto", mt: 4, p: 3}}>

            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Box sx={{ '& > :not(style)': { m: 1 }, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                label="Name"
                                type="text"
                                value={userData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="nickname"
                                label="Nickname"
                                type="text"
                                value={userData.nickname}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="province"
                                label="Province"
                                type="text"
                                value={userData.province}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="visa"
                                label="Visa"
                                type="number"
                                value={userData.visa}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="passport"
                                label="Passport"
                                type="number"
                                value={userData.passport}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="workpermit"
                                label="Work Permit"
                                type="number"
                                value={userData.workpermit}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="90DaysDoc"
                                label="90 Days Doc"
                                type="number"
                                value={userData['90DaysDoc']}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{width:'20%'}}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default UserForm;
