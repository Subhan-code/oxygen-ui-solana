import { components } from "@/lib/components";
import ComponentCard from "./gallery/ComponentCard";
import ViewAllCard from "./gallery/ViewAllCard";

export default function ComponentsShowcase() {
  // Select top showcase items for the Bento Grid layout
  const featuredHrefs = [
    "/components/otpinput",
    "/components/bouncesidebar",
    "/components/proximitysidebar",
    "/components/scrollprogressindicator",
    "/components/githubactivity",
    "/components/emojireaction",
    "/components/inputmorphmessage",
    "/components/gooeymenu",
  ];

  const showcaseItems = components.filter((item) =>
    featuredHrefs.includes(item.href)
  );

  const displayList =
    showcaseItems.length >= 4 ? showcaseItems : components.slice(0, 7);

  const heroItem = displayList[0];
  const gridItems = displayList.slice(1);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-6 md:py-32">
      <header className="flex flex-col items-center gap-3 text-center">
        <h2 className="max-w-2xl text-balance font-runde text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {components.length}+ components
        </h2>
        <p className="max-w-xl text-balance text-sm font-medium text-muted-foreground sm:text-base md:text-lg">
          Just one file for each component. Add it with the shadcn CLI, using
          any package manager you like.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {heroItem && (
          <ComponentCard
            item={heroItem}
            large
            autoPlay
            className="sm:col-span-2 lg:row-span-2"
          />
        )}
        {gridItems.map((item) => (
          <ComponentCard key={item.href} item={item} autoPlay />
        ))}
        <ViewAllCard
          count={components.length}
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>
    </section>
  );
}
