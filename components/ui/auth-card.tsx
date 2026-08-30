"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { size?: string; variant?: string }>(
  ({ className, size, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight transition-[transform,background-color,opacity] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
        "h-10 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

const Separator = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("shrink-0 bg-border/60 h-[1px] w-full", className)} {...props} />
);

interface AuthProvider {
  name: string;
  icon: React.ReactNode;
}

interface AuthCardProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  showEmail?: boolean;
  socialProviders?: AuthProvider[];
  walletProviders?: AuthProvider[];
}

// --- Default provider icons ---

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" role="img" aria-label="Google">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" role="img" aria-label="X">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" role="img" aria-label="Apple">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const PhantomIcon = () => (
  <svg viewBox="0 0 512 512" className="size-4" fill="currentColor" role="img" aria-label="Phantom">
    <path d="M60.5 512c65.2 0 114.2-68.2 143.5-122.2-3.6 11.9-5.5 23.9-5.5 35.3 0 31.5 15 54 44.7 54 40.7 0 84.2-43 106.7-89.2-1.6 6.7-2.4 12.9-2.4 18.6 0 22 10.3 35.8 31.2 35.8 66 0 132.5-140.8 132.5-263.9C511.2 84.5 470.8 0 369.6 0 191.7 0 0 261.5 0 430.4 0 496.7 29.6 512 60.5 512zm247.9-342.1c0-23.9 11-40.6 27.2-40.6 15.8 0 26.9 16.7 26.9 40.6s-11.1 41-26.9 41c-16.2 0-27.2-17.2-27.2-41zm84.6 0c0-23.9 11-40.6 27.3-40.6 15.8 0 26.9 16.7 26.9 40.6s-11.1 41-26.9 41c-16.3 0-27.3-17.2-27.3-41z" />
  </svg>
);

const BackpackIcon = () => (
  <svg viewBox="0 0 512 512" className="size-4" fill="currentColor" role="img" aria-label="Backpack">
    <path d="M386 369c18 0 27 0 32 5 6 6 6 15 6 33v25c0 36 0 54-11 65s-29 11-65 11H153c-36 0-54 0-65-11s-11-29-11-65v-25c0-18 0-27 5-33 6-5 15-5 33-5h236z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M250 76c176 0 174 118 174 174s0 7 0 7c0 10-8 19-19 19H96c-10 0-19-9-19-19 0 0 0-7 0-63 0-56-2-118 173-118zm0 45c-30 0-54 24-54 54s24 54 54 54 54-24 54-54-24-54-54-54z" />
    <path d="M250 3c38 0 71 13 80 35 1 4 2 5 1 7-1 1-4 1-8 0-12-2-29-4-43-4-10-1-20-1-30-1-10 0-20 0-30 1-15 0-32 2-43 4-5 1-7 1-8 0-1-2-1-3 1-7 8-22 41-35 80-35z" />
  </svg>
);

const defaultSocials: AuthProvider[] = [
  { name: "Google", icon: <GoogleIcon /> },
  { name: "X", icon: <XIcon /> },
  { name: "Apple", icon: <AppleIcon /> },
];

const defaultWallets: AuthProvider[] = [
  { name: "Phantom", icon: <PhantomIcon /> },
  { name: "Backpack", icon: <BackpackIcon /> },
];

const springCard = {
  type: "spring" as const,
  duration: 0.15,
  bounce: 0,
};

export const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      title = "Sign In",
      description = "Choose your preferred sign in method",
      showEmail = true,
      socialProviders = defaultSocials,
      walletProviders = defaultWallets,
      className,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = useState("");
    const shouldReduceMotion = useReducedMotion();

    return (
      <div
        ref={ref}
        data-slot="auth-card"
        className={cn(
          "relative flex flex-col gap-5 rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-6 shadow-xl w-full max-w-sm select-none",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-xs font-medium text-muted-foreground">{description}</p>
        </div>

        {/* Social / Web2 Sign in */}
        {socialProviders.length > 0 && (
          <div className="flex gap-2 w-full">
            {socialProviders.map((p) => (
              <motion.button
                key={p.name}
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={springCard}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold tracking-tight transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {p.icon}
                <span>{p.name}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Wallet Sign in */}
        {walletProviders.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Solana Wallets
            </span>
            <div className="flex gap-2 w-full">
              {walletProviders.map((w) => (
                <motion.button
                  key={w.name}
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={springCard}
                  className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold tracking-tight transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {w.icon}
                  <span>{w.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {showEmail && (
          <>
            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-[11px] font-medium text-muted-foreground uppercase">or</span>
              <Separator className="flex-1" />
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-xl border border-input bg-black/[0.02] dark:bg-white/[0.04] px-3.5 text-sm font-medium tracking-tight placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <Button type="submit" className="w-full">
                Continue with Email
              </Button>
            </form>
          </>
        )}
      </div>
    );
  }
);

AuthCard.displayName = "AuthCard";

export default AuthCard;
