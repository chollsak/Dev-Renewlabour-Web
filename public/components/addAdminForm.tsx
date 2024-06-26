'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    Autocomplete,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const options = [
    'กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น',
    'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย',
    'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา',
    'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์',
    'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา',
    'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต',
    'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง',
    'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร',
    'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี',
    'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย',
    'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี',
    'อุบลราชธานี'
]; // List of options for the autocomplete

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface AdminData {
    member_name: string;
    member_lastname: string;
    username: string;
    password: string;
    email: string;
    tel: string;
    company: string;
    m_picpath: File | null;
    lineID: string;
}

const AddAdmin: React.FC = () => {
    const [userData, setUserData] = useState<AdminData>({
        member_name: '',
        member_lastname: '',
        username: '',
        password: '',
        email: '',
        tel: '',
        company: '',
        m_picpath: null,
        lineID: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUserData({
                ...userData,
                m_picpath: event.target.files[0],
            });
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submitted data:', userData);
        // Here you can handle the submission to an API or another state
    };

    return (
        <Box sx={{ maxWidth: '60%' }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ m: 1, marginLeft: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="member_name"
                                label="ชื่อจริง"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="member_lastname"
                                label="นามสกุล"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="username"
                                label="Username"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="email"
                                label="อีเมล"
                                type="email"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="tel"
                                label="เบอร์โทรศัพท์"
                                type="tel"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                freeSolo
                                options={options}
                                renderInput={(params) => (
                                    <TextField {...params} name="company" label="บริษัทหรือหน่วยงาน" variant="outlined" fullWidth size="small" onChange={handleChange} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lineID"
                                label="Line ID"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ marginRight: 2 }}>
                                    {userData.m_picpath ? (
                                        <Box component="img" src={URL.createObjectURL(userData.m_picpath)} alt="Avatar" width="40" height="40" />
                                    ) : (
                                        <PhotoCamera />
                                    )}
                                </Avatar>
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary" size="small" sx={{ marginLeft: '30px', marginTop: '30px', ...FontStyle }}>
                    เพิ่ม
                </Button>
            </form>
        </Box>
    );
};

export default AddAdmin;
