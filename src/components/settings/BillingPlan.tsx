import React from 'react';
import { Typography, Button, Grid, Stack, Box, LinearProgress } from '@mui/material';
import { FontStyle } from './mockUserData';

const BillingPlan: React.FC = () => {
    // Mock data for current plan details
    const currentPlan = {
        name: 'เเพคเกจเริ่มต้น',
        description: 'เหมาะสำหรับ: ทุกองค์กรที่ต้องการเริ่มต้นอย่างมั่นคง',
        expirationDate: 'สถานะ: ใช้งานได้จนถึง 9 ธันวาคม 2564',
        price: '$199 Per Month',
        priceTag: 'Popular',
        additionalInfo: 'เเพคเกจพื้นฐานสำหรับทุกองค์กร',
        daysRemaining: 18,
        totalDays: 30,
    };

    const handleUpgradePlan = () => {
        // Handle plan upgrade logic
        alert('Upgrade Plan');
    };

    const handleCancelSubscription = () => {
        // Handle subscription cancellation logic
        alert('Cancel Subscription');
    };

    return (
        <Box sx={{ padding: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                แพลนปัจจุบัน
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" fontWeight="bold">
                        เเพคเกจปัจจุบันของคุณ: {currentPlan.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {currentPlan.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                        {currentPlan.expirationDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                        เราจะแจ้งเตือนคุณก่อนที่การสมัครสมาชิกจะหมดอายุ
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                        {currentPlan.price} <span style={{ color: '#9575cd', fontSize: '0.875rem' }}>{currentPlan.priceTag}</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {currentPlan.additionalInfo}
                    </Typography>
                    <Stack direction="row" spacing={2} mt={2}>
                        <Button variant="contained" className='rounded-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500' color="primary" onClick={handleUpgradePlan}>
                            เปลี่ยนแพลน
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleCancelSubscription}>
                            ยกเลิก
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ backgroundColor: '#fff3e0', padding: 2, borderRadius: 1 }}>
                        <Typography variant="body1" color="textSecondary">
                            <span style={{ color: '#f57c00', fontWeight: 'bold' }}>ต้องการความสนใจจากคุณ!</span> แผนการของคุณต้องการการอัปเดต
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="body2" color="textSecondary">
                                จำนวนวัน
                            </Typography>
                            <LinearProgress variant="determinate" value={(currentPlan.daysRemaining / currentPlan.totalDays) * 100} />
                            <Typography variant="body2" color="textSecondary" mt={1}>
                                เหลืออีก {currentPlan.daysRemaining} วัน ก่อนที่แผนการของคุณจะต้องอัปเดต
                            </Typography>
                            <Typography variant="body2" color="textSecondary" align="right">
                                {currentPlan.daysRemaining} of {currentPlan.totalDays} Days
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BillingPlan;
