import { config } from "@/utlis/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      // authorization:config.nextAuthSecret
    }),
  ],
//   pages: {
//     signIn: "/auth/signin",
//     signOut: "/auth/signiut",
//   },
};

export default NextAuth(authOptions);
