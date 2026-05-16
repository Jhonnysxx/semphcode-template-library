import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({
  label,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block w-full" htmlFor={inputId}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      ) : null}

      <input
        id={inputId}
        className={[
          "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 shadow-sm",
          "placeholder:text-slate-400",
          "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          className
        ].join(" ")}
        {...props}
      />

      {helperText ? (
        <span className="mt-2 block text-xs text-slate-500">{helperText}</span>
      ) : null}
    </label>
  );
}
