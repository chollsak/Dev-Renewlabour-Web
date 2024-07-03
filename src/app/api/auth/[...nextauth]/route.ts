import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { sqlConnect } from "../../../../../public/components/lib/db";
import * as sql from "mssql";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Credentials not provided");
          }
          let user = null;
          const pool = await sqlConnect();
          const users = await pool
            .request()
            .input("username", sql.VarChar, credentials?.username)
            .input("password", sql.VarChar, credentials?.password)
            .query(
              `SELECT * FROM members LEFT JOIN company ON members.company_id = company.cpn_id
              WHERE 
                  username = @username
                  AND BINARY_CHECKSUM(password) = BINARY_CHECKSUM(@password)`
            );
          if (users.recordset.length === 0) {
            return null;
          } else {
            user = {
              user_account: users.recordset,
              name: "admin",
            };
            if (!user) {
              return null; // User not found
            }
            return user;
          }
          return null;
        } catch (error) {
          console.error("Authentication error: ", error);
          return new NextResponse("Database Error", { status: 500 });
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: "http://localhost/",
        port: "3000", // เพิ่มพอร์ตที่นี่
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: "http://localhost/",
        port: "3000", // เพิ่มพอร์ตที่นี่
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: "http://localhost/",
        port: "3000", // เพิ่มพอร์ตที่นี่
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_account = user.user_account; // Adjust according to the structure of the user object you wish to persist in the token
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user_account = token.user_account; // Ensure the session reflects the structure you need on the client side
        session.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
