import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * cn = className
 * بتدمج tailwind classes بشكل ذكي
 * لو عندك: cn('p-4', condition && 'p-8')
 * tailwind-merge بتحل conflict بين p-4 و p-8 تلقائياً
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
