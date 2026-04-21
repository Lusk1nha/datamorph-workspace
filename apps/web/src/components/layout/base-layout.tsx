import { Outlet } from "react-router-dom"
import { DatabaseIcon } from "@phosphor-icons/react"

export function BaseLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-mono text-foreground selection:bg-primary/20">
      {/* Header (Visível Mobile e Desktop) com efeito Glass */}
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-sm bg-primary p-1.5 text-primary-foreground shadow-sm">
            <DatabaseIcon size={20} weight="fill" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            DATA<span className="text-primary">MORPH</span>
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative flex flex-1 flex-col">
        {/* Grid Industrial (Background) */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]" />

        {/* Content Wrapper */}
        <div className="z-10 flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
