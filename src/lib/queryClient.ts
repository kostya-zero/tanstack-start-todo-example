import { QueryClient } from "@tanstack/react-query"

const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
            },
        },
    })
}

export { createQueryClient }
