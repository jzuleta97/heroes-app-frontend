import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router"
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"
import { appRouter } from "./router/app.router"

const queryClient = new QueryClient()

export const HeroesApp = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <FavoriteHeroProvider>
                    <RouterProvider router={appRouter} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </FavoriteHeroProvider>
            </QueryClientProvider >
        </>
    )
}