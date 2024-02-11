import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isArray(a: any) {
    return !!a && a.constructor === Array;
}

export function isObject(a: any) {
    return !!a && a.constructor === Object;
}
