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

/**
 * Concatenates the input class values and merges them using Tailwind CSS utility function.
 *
 * @param {ClassValue[]} inputs - The class values to be concatenated and merged.
 * @return {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Check if the input is an array.
 *
 * @param {any} a - the input to be checked
 * @return {boolean} true if the input is an array, false otherwise
 */
export function isArray(a: any) {
    return !!a && a.constructor === Array;
}

/**
 * Check if the input is an object.
 *
 * @param {any} a - the input to check
 * @return {boolean} true if the input is an object, false otherwise
 */
export function isObject(a: any) {
    return !!a && a.constructor === Object;
}

/**
 * Generates a unique key using random bytes.
 *
 * @return {string} The unique key generated.
 */
export function uniq_key() {
    return randomBytes(10).toString("hex");
}

/**
 * Generates a random color from the COLORS array.
 *
 * @return {string} The randomly selected color.
 */
export function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}
