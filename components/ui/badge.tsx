import { cn } from '@/lib/cn'

export function Badge({
  className,
  tone = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        tone === 'neutral' && 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
        tone === 'success' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
        tone === 'warning' && 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
        tone === 'danger' && 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
        className
      )}
      {...props}
    />
  )
}
