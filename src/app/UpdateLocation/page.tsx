//Comment ตัวโตๆ
/* 
เหมือนกับในส่วนของเพิ่มบริษัทเลย แต่หน้านี้จะแสดงข้อมูลของบริษัทที่จะแก้ไข

หน้าแสดงข้อมูลบริษัทไปดูที่โฟลเดอร์ ViewLocation
หน้าเพิ่มข้อมูลบริษัทไปดูที่โฟลเดอร์ AddLocation
*/

import React from 'react'
import Layout from '../../../public/components/Layout'
import LocationForm from '../../../public/components/addLocationForm'
import UpdateLocationForm from '../../../public/components/UpdateLocationForm';


const Page = () => {
  return (
    <Layout>
        <UpdateLocationForm/>
    </Layout>
  );
};

export default Page;
