import ProximitySidebar from "@/components/ui/proximity-sidebar";
import type { ProximitySection } from "@/components/ui/proximity-sidebar";

export default function Page() {
  const sections: ProximitySection[] = [
    { id: "hero", label: "Hero", kind: "title" },
    { id: "features", label: "Features", kind: "subtitle" },
    { id: "pricing", label: "Pricing", kind: "section" },
    { id: "testimonials", label: "Testimonials", kind: "section" },
    { id: "faq", label: "FAQ", kind: "body" },
    { id: "cta", label: "CTA", kind: "subtitle" },
    { id: "footer", label: "Footer", kind: "body" },
  ];

  return (
   <div className="flex h-screen overflow-hidden">
  {/* Left Sidebar */}
  <aside className="w-24 shrink-0 border-r">
    <ProximitySidebar side="left" sections={sections} />
  </aside>

  {/* Scrollable Content */}
  <main className="flex-1 overflow-y-auto">
    <section
      id="hero"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Hero</h1>
    </section>

    <section
      id="features"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Features</h1>
    </section>

    <section
      id="pricing"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Pricing</h1>
    </section>

    <section
      id="testimonials"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Testimonials</h1>
    </section>

    <section
      id="faq"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">FAQ</h1>
    </section>

    <section
      id="cta"
      className="min-h-screen border-b flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">CTA</h1>
    </section>

    <section
      id="footer"
      className="min-h-screen flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Footer</h1>
    </section>
  </main>
</div>
  );
}
