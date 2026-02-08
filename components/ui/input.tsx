import { cn } from '@/lib/cn'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-400',
        className
      )}
      {...props}
    />
  )
}
