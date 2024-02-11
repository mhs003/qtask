"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="hidden lg:flex flex-col justify-start items-center p-4 pl-0 h-[calc(100%+50px)] border-r border-border/40 gap-2">
            <h2 className="text-lg font-semibold text-foreground mb-3">Menu</h2>
            <Link
                href="/"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "hover:bg-accent hover:text-accent-foreground",
                    "block px-4 py-2 rounded w-full",
                    pathname === "/" ? "bg-accent text-accent-foreground" : ""
                )}
            >
                Home
            </Link>
            <Link
                href="/about"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "hover:bg-accent hover:text-accent-foreground",
                    "block px-4 py-2 rounded w-full",
                    pathname === "/about"
                        ? "bg-accent text-accent-foreground"
                        : ""
                )}
            >
                About
            </Link>
        </div>
    );
}
