import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#2f7ae0]/40 bg-[#2f7ae0]/20 text-[#8ec1ff]",
        outline: "border-[#3a4964] text-zinc-300",
        success: "border-emerald-600/40 bg-emerald-600/15 text-emerald-300",
        warning: "border-amber-500/40 bg-amber-500/15 text-amber-200",
        danger: "border-rose-600/40 bg-rose-600/15 text-rose-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
