"use client";

import React, { useState } from "react";

export default function SpringToggle() {
  const [isOn, setIsOn] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const toggle = () => {
    if (!isInit) setIsInit(true);
    setIsOn(!isOn);
  };

  return (
    <div className="flex h-[200px] w-full items-center justify-center p-4">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        data-on={isOn}
        onClick={toggle}
        className={`t-toggle relative h-8 w-14 rounded-full p-1 transition-colors duration-300 ${
          isOn ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
        } ${isInit ? "is-init" : ""}`}
      >
        <span className="t-toggle-thumb block h-6 w-6 rounded-full bg-white shadow-md" />
      </button>

      <style jsx>{`
        .t-toggle-thumb {
          translate: 0 0;
          will-change: translate;
        }
        .t-toggle[data-on="true"] .t-toggle-thumb {
          translate: 24px 0;
        }
        .t-toggle.is-init[data-on="true"] .t-toggle-thumb {
          animation: t-toggle-on 350ms cubic-bezier(0.34, 1.35, 0.64, 1) both;
        }
        .t-toggle.is-init[data-on="false"] .t-toggle-thumb {
          animation: t-toggle-off 350ms cubic-bezier(0.34, 1.35, 0.64, 1) both;
        }
        @keyframes t-toggle-on {
          0% { translate: 0 0; }
          55% { translate: 25px 0; }
          80% { translate: 23px 0; }
          100% { translate: 24px 0; }
        }
        @keyframes t-toggle-off {
          0% { translate: 24px 0; }
          55% { translate: -1px 0; }
          80% { translate: 1px 0; }
          100% { translate: 0 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-toggle-thumb { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
