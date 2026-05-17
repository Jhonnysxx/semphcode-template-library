import { ReactNode } from 'react';

type BadgeProps = {
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  children: ReactNode;
};

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
