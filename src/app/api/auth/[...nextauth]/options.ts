import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
// import User from "@/model/user";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Google profile: ", profile);

                let userRole = "user";
                if(profile?.email === "gsbhakuni03@gmail.com"){
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            try {
                if(token) {
                    session.user.role = token.role;
                    // session.user._id = token._id;
                    // session.user.isVerified = token.isVerified;
                    // session.user.isAcceptingMessages = token.isAcceptingMessages;
                    // session.user.username = token.username;
                }
            } catch (error) {
                console.error("Error handling session callback:", error);
            }
            return session;
        },
        async jwt({ token, user }) {
            try {
                if(user) {
                    token.role = user.role;
                    // token._id = user._id?.toString();
                    // token.isVerified = user.isVerified;
                    // token.isAcceptingMessages = user.isAcceptingMessages;
                    // token.username = user.username;
                }
            } catch (error) {
                console.error("Error handling JWT callback:", error);
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "default_secret",
};
