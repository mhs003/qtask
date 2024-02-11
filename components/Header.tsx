"use client";

import React, { useState } from "react";
import { ThemeToggler } from "./theme-toggler";
import Link from "next/link";
import { CheckCircle, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const [sheetOpen, setSheetOpen] = useState(false);
    return (
        <div className="lg:col-span-2 border-b border-border/50 flex flex-row justify-center items-center">
            <div className="container flex flex-row justify-between items-center">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                            onClick={() =>
                                setSheetOpen((p) => {
                                    return !p;
                                })
                            }
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle className="text-center">
                                Menu
                            </SheetTitle>
                            <SheetDescription className="flex flex-col justify-start items-center gap-2 !mt-3">
                                <Link
                                    href="/"
                                    className={cn(
                                        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "block px-4 py-2 rounded w-full",
                                        pathname === "/"
                                            ? "bg-accent text-accent-foreground"
                                            : ""
                                    )}
                                    onClick={() =>
                                        setSheetOpen((p) => {
                                            return !p;
                                        })
                                    }
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
                                    onClick={() =>
                                        setSheetOpen((p) => {
                                            return !p;
                                        })
                                    }
                                >
                                    About
                                </Link>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Link
                    href="/"
                    className="text-xl font-bold text-foreground flex justify-center items-center gap-2"
                >
                    <CheckCircle className="text-primary" />
                    <span className="text-base">qTask</span>
                </Link>
                <ThemeToggler />
            </div>
        </div>
    );
}
