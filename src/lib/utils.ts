import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes, with later arguments winning on conflicts. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
