import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user_account: {
      /** The user's postal address. */
      mem_id: any;
    };
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
    mem_id: any;
    name: string;
  }
  interface JWT {
    /** OpenID ID Token */
    user_account?: any;
    name: string;
  }
}
