"use client";

import { useId, useState, type ComponentPropsWithoutRef } from "react";
import { IconNounEye } from "@/components/icons";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & { label: string; error?: string };

/** Password field with the 19x19 reveal toggle drawn at the right of the login/registration password box. */
export function PasswordInput({ label, error, className, id, ...rest }: Props) {
  const [show, setShow] = useState(false);
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={show ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="h-[50px] w-full bg-sand/50 py-0 pl-[10px] pr-12 text-body text-ink outline-none focus-visible:outline-2 focus-visible:outline-terracotta"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-[13px] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-ink"
        >
          <IconNounEye className={cn("size-[19px]", show && "opacity-50")} />
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-meta text-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}
