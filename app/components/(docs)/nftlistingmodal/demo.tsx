"use client";

import React from "react";
import { NftListingModal } from "@/components/ui/nft-listing-modal";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <NftListingModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
