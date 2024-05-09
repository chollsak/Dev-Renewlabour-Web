
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
    ListItemText
} from '@mui/material';


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


const LocationForm: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);

    const [searchTextWork, setSearchTextWork] = useState('');
    const [filteredAddressesWork, setFilteredAddressesWork] = useState<Address[]>([]);

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
        if (!value) {
            setFilteredAddressesWork([]);
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

        setFilteredAddressesWork(matches); // Ensure this line correctly updates the state
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


    return (
        <Card sx={{ width: '100%', boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2, flexDirection: 'column' }}>
                   
                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginBottom: '15px' }}>ข้อมูลที่ทำงาน</Typography>
                    <Grid container spacing={2}>
                        <Grid container spacing={2} marginLeft={0.05}>
                            <Grid item xs={2}>
                                <TextField
                                    label="ชื่อบริษัท"
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="เลขที่/ชื่ออาคาร"
                                    variant="outlined"
                                    required

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={8}>
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
                            <Grid container spacing={2} marginLeft={0.05} marginTop={'-30px'}>
                                <Grid item xs={5}>
                                    <TextField
                                        label="เบอร์โทรศัพท์"
                                        variant="outlined"
                                        required

                                        size="small"
                                        sx={{ width: '100%', margin: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        label="อีเมลล์(หากมี)"
                                        variant="outlined"


                                        size="small"
                                        sx={{ width: '100%', margin: 1 }}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>


                </Box>
                <Button variant="contained" sx={{ width: '100%', marginTop: 2 }}>เพิ่ม</Button>
            </CardContent>
        </Card>
    );
};

export default LocationForm;
