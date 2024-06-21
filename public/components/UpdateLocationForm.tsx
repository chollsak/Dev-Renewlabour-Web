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

const UpdateLocationForm: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [searchTextWork, setSearchTextWork] = useState('');
    const [filteredAddressesWork, setFilteredAddressesWork] = useState<Address[]>([]);
    const [logo, setLogo] = useState<File | null>(null);
    const [branchType, setBranchType] = useState<string>('หลัก');

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
        setFilteredAddressesWork([]);
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(event.target.files[0]);
        }
    };

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
                                defaultValue={'บริษัท ออกแลนด์ จำกัด (สาขา สำนักงานใหญ่)'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ตึกของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'อาคาร ออกแลนด์ ทาวเวอร์'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ชั้นของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'ชั้น 16'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="หมู่บ้านที่บริษัทตั้ง"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'หมู่บ้าน ออกแลนด์ พาร์ค'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ห้องที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'ห้อง 1601'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="หมู่ที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'หมู่ 1'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ซอยที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'ซอย ออกแลนด์ พาร์ค'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ถนนที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'ถนน สุขุมวิท'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="เมืองที่ตั้งของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'เมืองกรุงเทพ'}
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
                            <TextField
                                label="รหัสไปรษณีย์ของบริษัท"
                                variant="outlined"
                                required
                                size="small"
                                defaultValue={'10500'}
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small" sx={{ margin: 1 }}>
                                <InputLabel id="branch-type-label">ประเภทสาขา</InputLabel>
                                <Select
                                    labelId="branch-type-label"
                                    id="branch-type"
                                    value={branchType}
                                    label="ประเภทสาขา"
                                    defaultValue='หลัก'
                                    onChange={(event) => setBranchType(event.target.value)}
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
                                        <img src={URL.createObjectURL(logo)} alt="Logo" width="40" height="40" />
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
                <Button variant="contained" sx={{ width: '100%', marginTop: 2 }}>เพิ่ม</Button>
            </CardContent>
        </Card>
    );
};

export default UpdateLocationForm;
