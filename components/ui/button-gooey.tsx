"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";

export const ButtonGooey = () => {
  return (
    <>
      <div className="wrapper">
        <button className="button">
          Hover me
          <div className="bubble">
            <ArrowRightIcon className="h-8 w-8" />
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

      <style jsx>{`
        .wrapper {
          filter: url("#gooey");
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button {
          background: #000;
          color: #eee;
          display: inline-flex;
          font-weight: bold;
          padding: 0 24px 0 24px;
          border-radius: 12px;
          font-size: 1.25rem;
          line-height: 1.25rem;
          height: 64px;
          align-items: center;
        }

        .bubble {
          color: #fff;
          z-index: -10;
          display: flex;
          background: #000;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          position: absolute;
          content: "";
          border-radius: 12px;
          transition: transform 0.8s;
          transition-timing-function: bezier(0.2, 0.8, 0.2, 1.2);
          transform: translateX(80%) translateY(0%);
        }

        .button:hover .bubble {
          transform: translateX(210%) translateY(0%);
        }
      `}</style>
    </>
  );
};

export default ButtonGooey;
