import type { ComponentItem } from "@/lib/components";

export const sampleComponentEntry: ComponentItem = {
  id: "00",
  slug: "samplecomponent",
  title: "Sample Component",
  group: "Sample",
  category: "Sample",
  file: "components/ui/sample-component.tsx",
  name: "Sample Component",
  href: "/components/samplecomponent",
  registry: "sample-component",
  description: "A glassmorphic card primitive with animated spring status toggles and micro metric bars.",
  source: "https://github.com/Subhan-code/oxygen_ui/blob/main/components/ui/sample-component.tsx",
  preview: "/componentdemos/samplecomponent.mp4",
  dependencies: [
    "motion",
  ],
  interaction: "Toggle the top-right switch to observe spring-animated state and audio visualizer bars.",
  usage: `import { SampleComponent } from "@/components/ui/sample-component";\n\nexport default function Example() {\n  return (\n    <SampleComponent\n      title="Apple Pro Primitive"\n      badgeText="Live Metric"\n    />\n  );\n}`,
  props: [
    {
      name: "title",
      type: "string",
      default: '"Apple Pro Primitive"',
      description: "Header text rendered inside the component.",
    },
    {
      name: "description",
      type: "string",
      default: '"A glassmorphic interactive card built with spring physics."',
      description: "Subordinate description sentence.",
    },
    {
      name: "badgeText",
      type: "string",
      default: '"Live Metric"',
      description: "Pill badge status label.",
    },
    {
      name: "defaultActive",
      type: "boolean",
      default: "true",
      description: "Initial toggle state for uncontrolled usage.",
    },
  ],
};
