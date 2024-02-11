import { type ClassValue, clsx } from "clsx";
import { randomBytes } from "crypto";
import { twMerge } from "tailwind-merge";

const COLORS = [
    "rgb(239 68 68)",
    "rgb(59 130 246)",
    "rgb(34 197 94)",
    "rgb(20 184 166)",
    "rgb(234 179 8)",
    "rgb(132 204 22)",
    "rgb(249 115 22)",
];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isArray(a: any) {
    return !!a && a.constructor === Array;
}

export function isObject(a: any) {
    return !!a && a.constructor === Object;
}

export function uniq_key() {
    return randomBytes(10).toString("hex");
}

export function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}
