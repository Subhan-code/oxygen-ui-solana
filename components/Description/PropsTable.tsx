import type { ComponentProp } from "@/lib/components";

type PropsTableProps = {
  props: ComponentProp[];
};

/**
 * API reference for a component, laid out as flex rows (not a <table>):
 * a fixed-width Prop pill, a Type column whose options stack one per line,
 * and a flexible Description with the default.
 */
export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 border-b border-border/50 px-1 pb-2.5 text-[10px] font-medium uppercase tracking-wider text-foreground/45">
        <div className="w-24 shrink-0">Prop</div>
        <div className="w-28 shrink-0">Type</div>
        <div className="flex-1">Description</div>
      </div>

      {props.map((prop) => (
        <div
          key={prop.name}
          className="flex items-start gap-4 border-b border-border/40 px-1 py-4"
        >
          <div className="w-24 shrink-0">
            <code className="inline-flex items-center whitespace-nowrap rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground/75">
              {prop.name}
              {prop.required && <span className="text-[#FC4C01]">*</span>}
            </code>
          </div>

          <div className="flex w-28 shrink-0 flex-col gap-1 pt-1">
            {(prop.options ?? [prop.type]).map((value) => (
              <code
                key={value}
                className="font-mono text-xs leading-relaxed text-foreground/55"
              >
                {value}
              </code>
            ))}
          </div>

          <div className="flex-1 pt-0.5">
            <p className="text-sm leading-relaxed text-foreground/90">
              {prop.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
