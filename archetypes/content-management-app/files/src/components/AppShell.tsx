import { ReactNode } from 'react';
import { Header } from './Header';

type AppShellProps = {
  children: ReactNode;
  onCreate: () => void;
};

export function AppShell({ children, onCreate }: AppShellProps) {
  return (
    <div className="app-shell">
      <Header onCreate={onCreate} />
      <main>{children}</main>
    </div>
  );
}
