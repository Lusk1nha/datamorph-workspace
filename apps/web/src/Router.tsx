import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import { motion } from "motion/react"
import { NetworkIcon } from "@phosphor-icons/react"
import { BaseLayout } from "./components/layout/base-layout"

const PageLoader = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/30 bg-card/20 shadow-sm backdrop-blur-md">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <NetworkIcon className="h-6 w-6 text-primary/80" />
        </motion.div>

        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-2xl border border-primary/20 border-t-primary/60" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <h3 className="font-mono text-[13px] font-medium text-foreground">
          Loading module...
        </h3>
      </div>
    </motion.div>
  </div>
)

const Loadable =
  (Component: React.LazyExoticComponent<any>) => (props: any) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  )

const DataMorphPage = Loadable(
  lazy(() =>
    import("./modules/data-processing/pages/data-morph-page").then((m) => ({
      default: m.DataMorphPage,
    }))
  )
)

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <DataMorphPage />,
      },
    ],
  },
])
