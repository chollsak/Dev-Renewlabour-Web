'use client'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function App() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/employees");
        } else if (status === "loading") {
            "Loading"
        } else {
            router.push("/auth/signin")
        }
    }, [session, router, status]);

    return (
        <div >

        </div>
    );
}