export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-background" suppressHydrationWarning>
      {children}
    </div>
  );
}
