"use client";

import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface ButtonGooeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ButtonGooey = ({ children = "Hover me", className, ...props }: ButtonGooeyProps) => {
  return (
    <div data-slot="button-gooey-container" className={cn("relative inline-flex items-center justify-center select-none", className)}>
      <div className="gooey-wrapper">
        <button className="gooey-button" {...props}>
          <span className="relative z-10 font-semibold">{children}</span>
          <div className="gooey-bubble" aria-hidden="true">
            <ArrowRightIcon className="h-6 w-6 text-white dark:text-zinc-950" />
          </div>
        </button>
      </div>

      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style jsx global>{`
        .gooey-wrapper {
          filter: url("#gooey");
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .gooey-button {
          background: #000000;
          color: #eeeeee;
          display: inline-flex;
          font-weight: 700;
          padding: 0 24px;
          border-radius: 12px;
          font-size: 1.25rem;
          line-height: 1.25rem;
          height: 64px;
          align-items: center;
          position: relative;
          cursor: pointer;
          border: none;
          outline: none;
        }

        :global(.dark) .gooey-button {
          background: #ffffff;
          color: #09090b;
        }

        .gooey-bubble {
          color: #ffffff;
          z-index: -10;
          display: flex;
          background: #000000;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          position: absolute;
          right: 0;
          top: 0;
          border-radius: 12px;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1.2);
          transform: translateX(80%) translateY(0%);
        }

        :global(.dark) .gooey-bubble {
          background: #ffffff;
          color: #09090b;
        }

        .gooey-button:hover .gooey-bubble {
          transform: translateX(210%) translateY(0%);
        }
      `}</style>
    </div>
  );
};

export default ButtonGooey;
