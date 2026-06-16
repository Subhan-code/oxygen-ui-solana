import Sidebar from "@/components/Sidebar/Sidebar"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen p-4">
      <div className="relative bg-[#121212] h-full rounded-2xl">
        <div className="absolute top-0 left-0 z-50">
          <Sidebar />
        </div>

        <div className="relative z-0 h-full p-4">{children}</div>
      </div>
    </div>
  )
}
