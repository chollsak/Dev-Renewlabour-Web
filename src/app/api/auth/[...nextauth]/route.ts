import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { sqlConnect } from "../../../../../public/components/lib/db";
import * as sql from "mssql";
import { comparePassword, hashPassword } from "@/core/hashpassword";

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
            .query(
              `SELECT * FROM members LEFT JOIN company ON members.company_id = company.cpn_id
              WHERE 
                  username = @username`
            );

          if (users.recordset.length === 0) {
            return null;
          }

          const dbUser = users.recordset[0];

          const isValid = await comparePassword(
            credentials.password,
            dbUser.password
          );

          if (!isValid) {
            return null;
          }

          user = {
            user_account: dbUser,
            name: "admin",
          };

          return user;
        } catch (error) {
          console.error("Authentication error: ", error);
          return new NextResponse("Database Error", { status: 500 });
        }
      },
    }),
  ],
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
