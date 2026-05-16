import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0f2fe,_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] text-slate-950">
      {children}
    </div>
  );
}
