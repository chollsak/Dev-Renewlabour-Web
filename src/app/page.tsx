'use client'
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
} from "@mui/material";
import './font.css';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/employees");
    } else if (status === "loading") {
      router.push("/employees");
    } else {
      router.push("/auth/signin")
    }
  }, [session, router, status]);

  if (!session?.user) {
    return (
      <React.Fragment>
        <Container>

        </Container>
      </React.Fragment>
    );
  }
  // ไม่ต้องใช้ return ที่นี่ เพราะ useEffect จะจัดการเปลี่ยนเส้นทางหากมีเซสชัน
}