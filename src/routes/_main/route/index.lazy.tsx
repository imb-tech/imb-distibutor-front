import RouteMain from "@/pages/route"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/route/")({
    component: RouteMain,
})
