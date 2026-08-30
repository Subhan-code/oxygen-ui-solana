"use client";

import { formatDistanceToNow } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";


const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
);


function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

type TokenIconProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const TokenIcon = ({
  alt = "Token",
  className = "",
  width,
  height,
  ...props
}: TokenIconProps) => {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading",
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full inline-flex items-center justify-center font-medium text-muted-foreground",
          className,
        )}
        style={{ width, height, fontSize }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative inline-block" style={{ width, height }}>
      {status === "loading" && (
        <Skeleton
          className={cn("rounded-full absolute inset-0", className)}
          style={{ width, height }}
        />
      )}
      <img
        alt={alt}
        className={cn(
          "rounded-full block object-cover w-full h-full",
          status === "loading" && "opacity-0",
          className,
        )}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

interface TxnTableProps {
  transactions: {
    signature: string;
    timestamp: Date;
    action: string;
    token: string;
    tokenIcon?: string;
    amount: string;
    value?: string;
    explorerUrl?: string;
  }[];
  className?: string;
}

const truncateSignature = (sig: string) => {
  if (sig.length <= 12) return sig;
  return `${sig.slice(0, 4)}...${sig.slice(-4)}`;
};

const TxnTable = ({ transactions, className }: TxnTableProps) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>Signature</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Token</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((txn, i) => {
          const explorerUrl =
            txn.explorerUrl ?? `https://solscan.io/tx/${txn.signature}`;

          return (
            <TableRow key={`${txn.signature}-${i}`}>
              <TableCell>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 font-mono text-xs",
                    "text-muted-foreground hover:text-foreground transition-colors",
                  )}
                >
                  {truncateSignature(txn.signature)}
                  <ExternalLinkIcon className="size-3" />
                </a>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm" suppressHydrationWarning>
                {formatDistanceToNow(txn.timestamp, { addSuffix: true })}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md border border-transparent bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-semibold capitalize">
                  {txn.action}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {txn.tokenIcon && (
                    <TokenIcon
                      src={txn.tokenIcon}
                      alt={txn.token}
                      width={18}
                      height={18}
                    />
                  )}
                  <span className="font-medium">{txn.token}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{txn.amount}</span>
                  {txn.value && (
                    <span className="text-xs text-muted-foreground">
                      {txn.value}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export type { TokenIconProps, TxnTableProps };
export { TokenIcon, TxnTable };
