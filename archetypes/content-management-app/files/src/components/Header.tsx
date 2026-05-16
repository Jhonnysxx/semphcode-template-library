import { Layers3, Plus } from "lucide-react";
import { Button } from "./ui/Button";

type HeaderProps = {
  appName: string;
  onCreate: () => void;
};

export function Header({ appName, onCreate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
            <Layers3 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              SemphCode Template
            </p>
            <h1 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
              {appName}
            </h1>
          </div>
        </div>

        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" />
          Novo item
        </Button>
      </div>
    </header>
  );
}
