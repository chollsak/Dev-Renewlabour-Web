'use client';

import React, { useState, useEffect } from 'react';
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
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [searchTextWork, setSearchTextWork] = useState(`${companys[0]?.cpn_subdist}, ${companys[0]?.cpn_dist}, ${companys[0]?.cpn_prov}, ${companys[0]?.cpn_zip}`);
    const [filteredAddressesWork, setFilteredAddressesWork] = useState<Address[]>([]);
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
        const fetchAddresses = async () => {
            const response = await fetch("../data/thailand.json");
            const data: Address[] = await response.json();
            setAddresses(data);
        };

        fetchAddresses();
    }, []);

    const handleSearchChangeWork = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTextWork(value);
        filterAddresses(value, setFilteredAddressesWork);
    };

    const filterAddresses = (value: string, setFunction: React.Dispatch<React.SetStateAction<Address[]>>) => {
        if (!value) {
            setFunction([]);
            return;
        }

        const regex = new RegExp(`^${value}`, 'gi');
        const matches = addresses.filter(address =>
            address.district.match(regex) ||
            address.districtEng.match(regex) ||
            address.amphoe.match(regex) ||
            address.amphoeEng.match(regex) ||
            address.province.match(regex) ||
            address.provinceEng.match(regex)
        );

        setFunction(matches);
    };

    const handleListItemClickWork = (address: Address) => {
        setSearchTextWork(`${address.district}, ${address.amphoe}, ${address.province}, ${address.zipcode}`);
        setCompany({
            ...company,
            cpn_subdist: address.district,
            cpn_dist: address.amphoe,
            cpn_prov: address.province,
            cpn_zip: address.zipcode.toString()
        });
        setFilteredAddressesWork([]);
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(event.target.files[0]);
            setCompany({ ...company, logo: event.target.files[0].name })
        }
    };

    const handleSubmit = async () => {
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
                <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2, flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginBottom: '15px' }}>ข้อมูลบริษัท</Typography>
                    <Grid container spacing={2}>
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
                                label="ตึกของบริษัท"
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
                                label="ชั้นของบริษัท"
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
                                label="หมู่บ้านที่บริษัทตั้ง"
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
                                label="ห้องที่ตั้งของบริษัท"
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
                                label="หมู่ที่ตั้งของบริษัท"
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
                                label="ซอยที่ตั้งของบริษัท"
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
                                label="ถนนที่ตั้งของบริษัท"
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
                                label="เมืองที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                name='cpn_coun'
                                onChange={(e) => setCompany({ ...company, [e.target.name]: e.target.value })}
                                value={company.cpn_coun}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="ค้นหาที่อยู่ (จังหวัด อำเภอ ตำบล)"
                                variant="outlined"
                                value={searchTextWork}
                                required
                                size='small'
                                sx={{ width: '100%', margin: 1 }}

                                onChange={handleSearchChangeWork}
                            />
                            <List>
                                {filteredAddressesWork.map((address, index) => (
                                    <ListItem key={index} button onClick={() => handleListItemClickWork(address)}>
                                        <ListItemText
                                            primary={`${address.district}, ${address.amphoe}, ${address.province}, ${address.zipcode}`}
                                            secondary={`${address.districtEng}, ${address.amphoeEng}, ${address.provinceEng}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
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
                                <Avatar sx={{ marginRight: 2 }}>
                                    {logo ? (
                                        <Box component="img" src={URL.createObjectURL(logo)} alt="Logo" width="40" height="40" />
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
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={handleSubmit}>เพิ่ม</Button>
            </CardContent>
        </Card>
    );
};

export default UpdateLocationForm;
