//Comment ตัวโตๆ
/* 
เหมือนกับในส่วนของเพิ่มผู้ดูแลเลย แต่หน้านี้จะแสดงข้อมูลของผู้ดูแลที่จะแก้ไข

หน้าแสดงข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ ViewAdmin
หน้าเพิ่มข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ AddAdmin
*/

import React from 'react'
import Layout from '../../../public/components/Layout'
import UpdateAdmin from '../../../public/components/UpdateAdminForm'

export default function page() {
    return (
        <Layout>
            <UpdateAdmin/>
        </Layout>
    )
}