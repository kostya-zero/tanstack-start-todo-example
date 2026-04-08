/// <reference types="vite/client" />
import type { ReactNode } from "react"
import { Outlet, createRootRoute, HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router"

import appCss from "@/styles.css?url"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface RouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Tanstack To-Do",
            },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    const { queryClient } = Route.useRouteContext()
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <Scripts />
                </QueryClientProvider>
            </body>
        </html>
    )
}
