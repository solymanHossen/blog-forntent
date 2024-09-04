"use client";
import React from "react";
import {HoverBorderGradient} from "@/components/ui/hover-border-gradient";


export function HoverBorderGradientComponent() {
    return (
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="text-nowrap dark:bg-black bg-[#124E66] text-white dark:text-white flex items-center space-x-2 md:px-8 px-4 md:text-2xl text-xl"
            >
                <span>Create a Post</span>
            </HoverBorderGradient>
    );
}


