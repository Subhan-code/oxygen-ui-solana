import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const REGISTRY = "swamimalode07/rare-ui";

function ComponentSection({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed p-8">
        {children}
      </div>
      <code className="w-fit rounded-md bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
        npx shadcn@latest add {REGISTRY}/{name.toLowerCase().replace(/ /g, "-")}
      </code>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Rare UI</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          A shadcn registry of components. Install any item straight from
          GitHub with the shadcn CLI.
        </p>
      </header>

      <ComponentSection
        name="Button"
        description="A button with variants, sizes and asChild composition."
      >
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </ComponentSection>

      <ComponentSection
        name="Card"
        description="A card with header, content and footer sections."
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>A short description of the card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Cards group related content and actions together.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </ComponentSection>

      <ComponentSection
        name="Shimmer Button"
        description="A pill button with a looping shimmer highlight."
      >
        <ShimmerButton>Get Started</ShimmerButton>
        <ShimmerButton shimmerDuration="1.2s">Fast Shimmer</ShimmerButton>
      </ComponentSection>

      <ComponentSection
        name="Spotlight Card"
        description="A card with a mouse-tracking spotlight glow. Move your cursor over it."
      >
        <SpotlightCard className="w-full max-w-sm p-6">
          <h3 className="font-semibold">Spotlight</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Hover anywhere on this card and a soft glow follows your cursor.
          </p>
        </SpotlightCard>
      </ComponentSection>
    </div>
  );
}
