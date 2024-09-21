"use client";
import React, {useEffect, useState} from "react";
import {HoveredLink, Menu, MenuItem, ProductItem} from "./ui/navbar-menu";
import {cn} from "@/lib/utils";
import Link from "next/link";
import jwt_decode from "jsonwebtoken";
import {usePathname, useRouter} from 'next/navigation';
import Cookies from "js-cookie";
import {AnimatedModal} from "@/components/AnimatedModal";

export function NavBar() {
    const [username, setUsername] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded: any = jwt_decode.decode(token);
                if (decoded && decoded.username) {
                    setUsername(decoded.username);
                }
                if (!decoded && decoded.username) {
                    setUsername(null);
                }
            } catch (error) {
                console.error("Error decoding token", error);
            }
        }
    }, [pathname, router,]);

    const logOut = () => {
        Cookies.remove('token')
        setUsername(null);
        router.refresh()
        router.push('/auth/login')

    }

    return (
        <div className="relative flex items-center justify-center  w-full">

            <Navbar className="top-2" username={username} logOut={logOut}/>

        </div>
    );
}

function Navbar({className, username, logOut}: { className?: string; username: string | null; logOut?: () => void }) {
    const [active, setActive] = useState<string | null>(null);
    const pathname = usePathname();

    const getLinkClasses = (href: string) => {
        return cn(
            "dark:bg-[#748D92] bg-transparent text-[#D3D9D4] font-semibold py-2 px-4 rounded transition-transform hover:scale-105",
            pathname === href ? "bg-[#2E3944] dark:bg-[#2E3944]" : ""
        );
    };
    return (
        <div
            className={cn("fixed top-10   z-50  px-8 flex h-16 items-center max-w-[88rem] mx-auto w-full ", className)}
        ><Menu setActive={setActive}>
            <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-4">
                    <Link href="/" className={getLinkClasses("/")}>Home</Link>
                    <Link href={'/blog'}
                          className={getLinkClasses("/blog")}>
                        Blog
                    </Link>
                    <Link href={'/blog/popular-blog'}
                          className={getLinkClasses("/blog/popular-blog")}>Popular
                        Blog</Link>
                    <AnimatedModal triggerContent={'Created Post'}/>
                </div>
                {username ? (
                    <div className="avatar flex items-center gap-4">
            <span className="text-sm font-medium text-white dark:text-white">
              Hello, {username}
            </span>
                        <button onClick={logOut}
                                className="dark:bg-[#748D92] bg-[#212A31] text-[#D3D9D4] font-semibold py-2 px-4 rounded transition-transform hover:scale-105 ">
                            Logout
                        </button>

                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link href={"/auth/login"}
                              className=" bg-[#212A31] text-white font-semibold py-2 px-4 rounded transition-transform duration-300 ease-in-out hover:scale-105 animate-pulse">
                            Login
                        </Link>
                        <Link href={'/auth/register'}
                              className='bg-[#2E3944] text-white font-semibold py-2 px-4 rounded transition-transform duration-300 ease-in-out hover:scale-105 animate-pulse'>Register</Link>
                    </div>
                )}

            </div>
        </Menu>
        </div>
    );
}
