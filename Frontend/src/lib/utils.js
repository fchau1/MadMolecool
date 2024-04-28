import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default function extractUsername(email) {

  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);
  return username.charAt(0).toUpperCase() + username.slice(1);
}
