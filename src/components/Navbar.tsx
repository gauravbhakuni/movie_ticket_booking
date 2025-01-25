"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = ({ className }: { className?: string }) => {
    const { data: session, status } = useSession();
    const [active, setActive] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn();
    };

    const handleSignOut = async (e: React.FormEvent) => {
        e.preventDefault();
        await signOut();
    };

    return (
        <div className={cn("fixed top-4 inset-x-0 max-w-full mx-auto z-50 m-6", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Logo">
                </MenuItem>
                <div className="flex space-x-4">
                    <Link href={"/"}>
                        <MenuItem setActive={setActive} active={active} item="Home">
                        </MenuItem>
                    </Link>
                    <Link href={"/movies"}>
                        <MenuItem setActive={setActive} active={active} item="Movies">
                        </MenuItem>
                    </Link>
                    <Link href={"/contact"}>
                        <MenuItem setActive={setActive} active={active} item="Contact Us">
                        </MenuItem>
                    </Link>
                </div>
                {status === "authenticated" ? (
                    <Link href="/api/auth/signout?callbackUrl=/" onClick={handleSignOut}>
                        Logout
                    </Link>
                ) : (
                    <Link href="/api/auth/signin" onClick={handleSignIn}>
                        Login
                    </Link>
                )}
            </Menu>
        </div>
    )
}

export default Navbar;
