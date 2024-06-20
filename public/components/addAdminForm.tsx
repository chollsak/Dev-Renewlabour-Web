//Comment ตัวโตๆ
/* 
เพิ่มผู้ดูแลดังนี้
member_name ชื่อจริงของผู้ดูแล ใช้ Text-Field
member_lastname นามสกุลของผู้ดูแล ใช้ Text-Field
username usernameของผู้ดูแล ใช้ Text-Field
password passwordของผู้ดูแล ใช้ Text-Field
email อีเมลของผู้ดูแล ใช้ Text-Field
tel เบอร์โทรศัพท์ของผู้ดูแล ใช้ Text-Field
company ใช้ autocomplete แบบเดียวกับเพิ่มข้อมูลแรงงาน
m_picpath ใช้ input type file กับ Avatar ของ Mui ผสมกัน ถ้าถามใน ChatGbt น่าจะช่วยเรื่องนี้อยู่
lineID lineIDของผู้ดูแล ใช้ Text-Field

หน้าแสดงข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ ViewAdmin
หน้าอัพเดตข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ UpdateAdmin
*/

'use client';

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography
} from '@mui/material';


const options = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
    'ตรัง', 'ตราด', 'ตาก',
    'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
    'บึงกาฬ', 'บุรีรัมย์',
    'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
    'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่',
    'ภูเก็ต',
    'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
    'ยโสธร', 'ยะลา',
    'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
    'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
    'ศรีสะเกษ',
    'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
    'หนองคาย', 'หนองบัวลำภู',
    'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี']; // List of options for the autocomplete

interface UserData {
    id: number;
    name: string;
    nickname: string;
    province: string;
    email: string;
    telephone: string;
    company: string;
    branch: string;
}

const defaultData: UserData = {
    id: 0,
    name: '',
    nickname: '',
    province: '',
    email: '',
    telephone: '',
    company: '',
    branch: '',
};

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};


const AddAdmin: React.FC = () => {
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

    //Visa	Passport	ใบอนุญาตทำงาน	เอกสาร 90 วัน

    return (
        <Box sx={{ maxWidth: '60%' }}>

            <form onSubmit={handleSubmit} style={{}}>
                <Box sx={{ m: 1, marginLeft: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                name="name"
                                label="ชื่อ-นามสกุล"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                name="nickname"
                                label="ชื่อเล่น"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                                freeSolo // Allows arbitrary input, not just selections from the list
                                options={options}
                                renderInput={(params) => (
                                    <TextField {...params} label="จังหวัด" variant="outlined" fullWidth />
                                )}

                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="id"
                                label="รหัสประจำตัว"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="email"
                                label="Email"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="telephone"
                                label="เบอร์มือถือ"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="branch"
                                label="สาขา"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="company"
                                label="บริษัทหรือหน่วยงาน"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                required
                                size='small'
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary" size='small' sx={{ marginLeft: '30px', marginTop: '30px', ...FontStyle }}>
                    เพิ่ม
                </Button>
            </form>
        </Box>
    );
};

export default AddAdmin;

