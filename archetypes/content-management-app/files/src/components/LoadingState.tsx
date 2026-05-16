export function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          key={index}
        >
          <div className="h-32 animate-pulse bg-slate-100" />

          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

            <div className="flex gap-2 pt-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
