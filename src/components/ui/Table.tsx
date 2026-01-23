import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Table = ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="relative w-full overflow-auto">
        <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
);

export const THeader = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn('[&_tr]:border-b bg-muted/30', className)} {...props} />
);

export const TBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

export const TRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr
        className={cn(
            'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
            className
        )}
        {...props}
    />
);

export const THead = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={cn(
            'h-12 px-4 text-left align-middle font-bold text-muted-foreground [&:has([role=checkbox])]:pr-0 uppercase text-[10px] tracking-wider',
            className
        )}
        {...props}
    />
);

export const TCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
        className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-foreground sm:text-muted-foreground', className)}
        {...props}
    />
);
