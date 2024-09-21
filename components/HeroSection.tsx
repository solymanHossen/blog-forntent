import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";
import {HoverBorderGradientComponent} from "@/components/HoverBorder";

export function HeroSection() {
    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col items-start gap-4">
                <h3 className="text-2xl relative z-20 md:text-4xl lg:text-5xl font-bold text-center text-black dark:text-white font-sans tracking-tight max-w-[1100px]">
                    This is Your platform and your mind all news share{" "}
                    <div
                        className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div
                            className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            <span className="">Mukto Batas</span>
                        </div>
                        <div
                            className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                            <span className="">Mukto Batas</span>
                        </div>
                    </div>
                </h3>
                <Link href={"/blog"}>
                    <HoverBorderGradientComponent gradientContent={'View All Post'}/>
                </Link>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
