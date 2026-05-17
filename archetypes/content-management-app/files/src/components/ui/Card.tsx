import { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className = '', children, ...props }: CardProps) {
  return <div className={`card ${className}`} {...props}>{children}</div>;
}
