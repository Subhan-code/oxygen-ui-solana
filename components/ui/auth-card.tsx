"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type AuthSocialProvider = "google" | "x" | "apple";

export interface AuthCardProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  onSocial?: (provider: AuthSocialProvider) => void;
  onEmail?: (email: string) => void;
  pending?: boolean;
  error?: string;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const socialButtons = [
  { provider: "google" as const, label: "Google", icon: <GoogleIcon /> },
  { provider: "x" as const, label: "X", icon: <XIcon /> },
  { provider: "apple" as const, label: "Apple", icon: <AppleIcon /> },
];

export const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      title = "Sign in",
      description = "Continue with a provider or email",
      onSocial,
      onEmail,
      pending = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;
      onEmail?.(trimmed);
    };

    return (
      <div
        ref={ref}
        data-slot="auth-card"
        aria-labelledby="auth-card-title"
        className={cn(
          "relative flex flex-col gap-5 rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-6 shadow-xl w-full max-w-sm select-none",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1 text-center">
          <h2 id="auth-card-title" className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs font-medium text-muted-foreground">{description}</p>
        </div>

        {/* Social row */}
        <div className="flex gap-2 w-full">
          {socialButtons.map((btn) => (
            <button
              key={btn.provider}
              type="button"
              aria-label={`Sign in with ${btn.label}`}
              onClick={() => onSocial?.(btn.provider)}
              disabled={pending}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-black/10 dark:border-white/10",
                "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold tracking-tight text-foreground",
                "transition-all duration-140 cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Or divider */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          <span className="text-[11px] font-medium text-muted-foreground uppercase">or</span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-email" className="sr-only">
              Email
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={pending}
              className={cn(
                "h-10 rounded-xl border border-input bg-black/[0.02] dark:bg-white/[0.04] px-3.5 text-sm font-medium tracking-tight",
                "placeholder:text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50",
                error && "border-red-500/70 focus-visible:ring-red-500/40"
              )}
            />
            {error && (
              <p id="auth-email-error" className="text-[11px] font-medium text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={cn(
              "w-full h-10 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight",
              "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all duration-140",
              "outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
            )}
          >
            {pending ? "Continuing..." : "Continue with Email"}
          </button>
        </form>
      </div>
    );
  }
);

AuthCard.displayName = "AuthCard";

export default AuthCard;
