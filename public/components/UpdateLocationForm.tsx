'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { uploadProfilePicture } from '@/core/axiosEmployee';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CreateInput } from "thai-address-autocomplete-react";
import LogosAvatar from '@/components/logosAvatar';

const InputThaiAddress = CreateInput();

interface Address {
    district: string;
    amphoe: string;
    province: string;
    zipcode: string;
    districtEng: string;
    amphoeEng: string;
    provinceEng: string;
}

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface UserFormProps {
    companys: any;
    params: any
}

const UpdateLocationForm: React.FC<UserFormProps> = ({ companys, params }) => {
    const [address, setAddress] = useState({
        district: companys[0]?.cpn_subdist, // ตำบล tambol
        amphoe: companys[0]?.cpn_dist, // อำเภอ amphoe
        province: companys[0]?.cpn_prov, // จังหวัด changwat
        zipcode: companys[0]?.cpn_zip, // รหัสไปรษณีย์ postal code
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
        cpn_n: companys[0]?.cpn_n,
        cpn_build: companys[0]?.cpn_build,
        cpn_fl: companys[0]?.cpn_fl,
        cpn_vill: companys[0]?.cpn_vill,
        cpn_room: companys[0]?.cpn_room,
        cpn_moo: companys[0]?.cpn_moo,
        cpn_soi: companys[0]?.cpn_soi,
        cpn_st: companys[0]?.cpn_st,
        cpn_coun: companys[0]?.cpn_coun,
        cpn_subdist: companys[0]?.cpn_subdist,
        cpn_dist: companys[0]?.cpn_dist,
        cpn_prov: companys[0]?.cpn_prov,
        cpn_zip: companys[0]?.cpn_zip,
        logo: companys[0]?.logo,
        branch: companys[0]?.branch
    });

    const router = useRouter(); // Use the useRouter hook

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
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${params.cpn_id}`, { company });
            if (response.status === 200 && logo) {
                const uploadPicPath = await uploadProfilePicture(logo, "companys", params.cpn_id, "logo");

                if (uploadPicPath.status === 200 || !uploadPicPath || uploadPicPath.status === 400) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'แก้ไขข้อมูลบริษัทได้สำเร็จ!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then((result: SweetAlertResult) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            router.push(`/ViewLocation/${params.cpn_id}`);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'ล้มเหลว!',
                        text: "ล้มเหลวในการแก้ไขข้อมูลบริษัท เรื่องไฟล์โลโก้",
                        icon: 'error',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    })
                }
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: "ล้มเหลวในการแก้ไขข้อมูลบริษัท เรื่องข้อมูล",
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
                                <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
                                    <input
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleLogoChange}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <Avatar
                                            className='border-4 border-[#2074d4]'
                                            sx={{
                                                marginRight: 2,
                                                width: '200px',
                                                height: '200px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                },
                                            }}>
                                            {logo ? (
                                                <Avatar src={URL.createObjectURL(logo)} sx={{ width: 200, height: 200 }} alt="No Picture" />
                                            ) : (
                                                <LogosAvatar cpn_id={params.cpn_id} logo={company.logo} />
                                            )}
                                        </Avatar>
                                    </label>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="ชื่อบริษัท (ชื่อสาขาย่อย ถ้ามี โดยชื่อสาขาย่อยต้องอยู่ในวงเล็บด้วย)"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_n'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_n}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ตึก"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_build'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_build}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ชั้น"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_fl'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_fl}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="หมู่บ้าน"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_vill'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_vill}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ห้อง"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_room'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_room}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="หมู่"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_moo'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_moo}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ซอย"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_soi'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_soi}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="ถนน"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_st'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_st}
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="เมือง"
                                    variant="outlined"
                                    required
                                    size="small"
                                    name='cpn_coun'
                                    onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                    value={company.cpn_coun}
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
                        </Grid>
                    </Box>
                    <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} type='submit'>เพิ่ม</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateLocationForm;
