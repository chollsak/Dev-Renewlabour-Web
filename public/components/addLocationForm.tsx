'use client';

import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { uploadProfilePicture } from '@/core/axiosEmployee';
import { CreateInput } from "thai-address-autocomplete-react";

const InputThaiAddress = CreateInput();

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const LocationForm: React.FC = () => {
    const [address, setAddress] = useState({
        district: '', // ตำบล tambol
        amphoe: '', // อำเภอ amphoe
        province: '', // จังหวัด changwat
        zipcode: '', // รหัสไปรษณีย์ postal code
    });

    const handleChange = (scope: any) => (value: any) => {
        setAddress((oldAddr) => ({
            ...oldAddr,
            [scope]: value,
        }));
    };

    const handleSelect = (address: any) => {
        setAddress(address);
    };

    const [logo, setLogo] = useState<File | null>(null);

    const [company, setCompany] = useState({
        cpn_n: '',
        cpn_build: '',
        cpn_fl: '',
        cpn_vill: '',
        cpn_room: '',
        cpn_moo: '',
        cpn_soi: '',
        cpn_st: '',
        cpn_coun: '',
        cpn_subdist: '',
        cpn_dist: '',
        cpn_prov: '',
        cpn_zip: '',
        logo: '',
        branch: 'หลัก'
    });

    useEffect(() => {
        if (address.district && address.amphoe && address.province && address.zipcode) {
            setCompany((prevCompany) => ({
                ...prevCompany,
                cpn_subdist: address.district,
                cpn_dist: address.amphoe,
                cpn_prov: address.province,
                cpn_zip: address.zipcode,
            }));
        }
    }, [address]);

    const router = useRouter(); // Use the useRouter hook


    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(event.target.files[0]);
            setCompany({ ...company, logo: event.target.files[0].name })
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Send the data to the API using Axios
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/companies`, { company });
            const companyId = response.data.companyId
            if (response.status === 200 && companyId) {
                const uploadPicPath = await uploadProfilePicture(logo, "companys", companyId, "logo");

                if (uploadPicPath.status === 200 || !uploadPicPath || uploadPicPath.status === 400) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'เพิ่มข้อมูลบริษัทได้สำเร็จ!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then((result: SweetAlertResult) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            router.push("/Location");
                        }
                    });
                } else {
                    //ลบข้อมูล persons 
                    await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${companyId}`)
                    Swal.fire({
                        title: 'ล้มเหลว!',
                        text: "ล้มเหลวในการเพิ่มข้อมูลบริษัท เรื่องไฟล์โลโก้",
                        icon: 'error',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    })
                }
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: "ล้มเหลวในการเพิ่มข้อมูลบริษัท เรื่องข้อมูล",
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'ล้มเหลว!',
                text: "การเชื่อมต่อกับ Database ล้มเหลว",
                icon: 'error',
                showConfirmButton: true,
                allowOutsideClick: false,
            })
        }
    }

    return (
        <Card sx={{ width: '100%', boxShadow: 3 }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2, flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginBottom: '15px' }}>ข้อมูลบริษัท</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="ชื่อบริษัท (ชื่อสาขาย่อย ถ้ามี โดยชื่อสาขาย่อยต้องอยู่ในวงเล็บด้วย)"
                                    name='cpn_n'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ตึก"
                                    name='cpn_build'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ชั้น"
                                    name='cpn_fl'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="หมู่บ้าน"
                                    name='cpn_vill'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ห้อง"
                                    name='cpn_room'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="หมู่"
                                    name='cpn_moo'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ซอย"
                                    name='cpn_soi'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ถนน"
                                    name='cpn_st'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="เมือง"
                                    name='cpn_coun'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>ตำบล</label>
                                <InputThaiAddress.District
                                    value={address['district']}
                                    onChange={handleChange('district')}
                                    onSelect={handleSelect} />
                            </Grid>
                            <Grid item xs={6}>
                                <label>อำเภอ</label>
                                <InputThaiAddress.Amphoe
                                    value={address['amphoe']}
                                    onChange={handleChange('amphoe')}
                                    onSelect={handleSelect}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>จังหวัด</label>
                                <InputThaiAddress.Province
                                    value={address['province']}
                                    onChange={handleChange('province')}
                                    onSelect={handleSelect}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>รหัสไปรษณีย์</label>
                                <InputThaiAddress.Zipcode
                                    value={address['zipcode']}
                                    onChange={handleChange('zipcode')}
                                    onSelect={handleSelect}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size="small" sx={{ margin: 1 }}>
                                    <InputLabel id="branch-type-label">ประเภทสาขา</InputLabel>
                                    <Select
                                        labelId="branch-type-label"
                                        id="branch-type"
                                        name='branch'
                                        value={company.branch}
                                        label="ประเภทสาขา"
                                        onChange={(event) => setCompany({ ...company, [event.target.name]: event.target.value })}
                                    >
                                        <MenuItem value="หลัก">หลัก</MenuItem>
                                        <MenuItem value="ย่อย">ย่อย</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
                                    <Avatar sx={{ marginRight: 2, width: '200px', height: '200px' }}>
                                        {logo ? (
                                            <Box component="img" src={URL.createObjectURL(logo)} alt="Logo" width="200" height="200" />
                                        ) : (
                                            <PhotoCamera />
                                        )}
                                    </Avatar>
                                    <input
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleLogoChange}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span" >
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} type='submit'>เพิ่ม</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LocationForm;
