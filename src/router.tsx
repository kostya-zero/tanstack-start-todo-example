import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { createQueryClient } from "./lib/queryClient"

export function getRouter() {
    const queryClient = createQueryClient()

    const router = createRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
    })

    return router
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}
