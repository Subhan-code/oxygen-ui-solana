import type { ComponentProp } from "@/lib/components";

type PropsTableProps = {
  props: ComponentProp[];
};

/**
 * Reusable API reference table for a component: one row per prop with its
 * type, default, and what it does. Driven by the `props` array on a
 * ComponentItem so it can be reused across components.
 */
export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/40">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="bg-muted text-[11px] font-medium uppercase tracking-wide text-foreground/45">
            <th className="w-[26%] px-3 py-2 font-medium">Prop</th>
            <th className="w-[26%] border-l border-dashed border-border/40 px-3 py-2 font-medium">
              Type
            </th>
            <th className="border-l border-dashed border-border/40 px-3 py-2 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-t border-border/40 align-top"
            >
              <td className="px-3 py-3">
                <code className="break-words text-xs font-medium text-foreground/90">
                  {prop.name}
                  {prop.required && <span className="text-[#FC4C01]">*</span>}
                </code>
              </td>
              <td className="border-l border-dashed border-border/40 px-3 py-3">
                <code className="break-words text-xs text-foreground/55">
                  {prop.options ? prop.options.join(" | ") : prop.type}
                </code>
              </td>
              <td className="border-l border-dashed border-border/40 px-3 py-3">
                <p className="text-xs leading-relaxed text-foreground/70">
                  {prop.description}
                </p>
                {prop.default !== undefined && (
                  <p className="mt-1 text-[11px] text-foreground/40">
                    Default:{" "}
                    <code className="text-foreground/55">{prop.default}</code>
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
