import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user_account: [
      {
        /** The user's postal address. */
        id: string;
        email: string;
        status: string;
        telephone: string;
        username: string;
        password: string;
        name: string;
        department: string;
        initial_name: string;
        mem_id: string;
      }
    ];
    name: string;
  }
  interface User {
    user_account: any;
    name: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User_Account {
    email: string;
    name: string;
  }
  interface JWT {
    /** OpenID ID Token */
    user_account?: any;
    name: string;
  }
}
