// NavbarServer.tsx

import React from "react";
import Link from "next/link";
import { signIn, signOut } from "@/actions/auth";

const NavbarServer = ({ session }: { session: any }) => {
    const handleSignOut = async () => {
        try {
            await signOut();
            // Add any additional logic after sign out if needed
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleSignIn = async () => {
        try {
            await signIn();
            // Add any additional logic after sign in if needed
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div>
            {session && session.user ? (
                <div>
                    <p>{session.user.name}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <button onClick={handleSignIn}>Sign In</button>
            )}
        </div>
    )
}

export default NavbarServer;
