// Single source of truth for the sidebar.
// To add a component: append { name, href } here, then create the matching
// folder at app/components/<slug>/page.tsx. That's it.

export type ComponentItem = {
  name: string
  href: string
}

export const components: ComponentItem[] = [
  { name: "Folder component", href: "/components/foldercomponent" },
  { name: "Button component", href: "/components/buttoncomponent" },
  { name: "Input component", href: "/components/inputcomponent" },
  { name: "Select component", href: "/components/selectcomponent" },
  { name: "Checkbox component", href: "/components/checkboxcomponent" },
  { name: "Radio component", href: "/components/radiocomponent" },
  { name: "Switch component", href: "/components/switchcomponent" },
  { name: "Textarea component", href: "/components/textareacomponent" },
  { name: "Tooltip component", href: "/components/tooltipcomponent" },
  { name: "Popover component", href: "/components/popovercomponent" },
  { name: "Menu component", href: "/components/menucomponent" },
  { name: "Dialog component", href: "/components/dialogcomponent" },
]
