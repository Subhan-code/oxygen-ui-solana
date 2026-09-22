import React from "react";

export function GridExternalCaption() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="group relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-[30px] sm:rounded-[34px] bg-black p-3 sm:p-4 border border-[#18191d] hover:border-neutral-700 shadow-xl transition-all duration-200"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-white px-4 sm:px-5 py-1 sm:py-1.5 rounded-b-[16px] sm:rounded-b-[18px] shadow-md max-w-[70%] sm:max-w-[200px] pointer-events-none opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
            <span className="text-black text-xs sm:text-[13px] font-semibold tracking-tight text-center truncate font-sans">
              solana wallet
            </span>
          </div>
          <div className="w-full h-full flex items-center justify-center p-2 sm:p-3" />
        </div>
      ))}
    </div>
  );
}

export default GridExternalCaption;
