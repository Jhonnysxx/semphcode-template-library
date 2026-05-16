import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: CardProps) {
  return (
    <div className={["border-b border-slate-100 p-5", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }: CardProps) {
  return (
    <div className={["p-5", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: CardProps) {
  return (
    <h3
      className={["text-base font-bold tracking-tight text-slate-950", className].join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <p className={["mt-1 text-sm text-slate-500", className].join(" ")} {...props}>
      {children}
    </p>
  );
}
