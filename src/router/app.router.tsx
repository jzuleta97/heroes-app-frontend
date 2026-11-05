import { AdminLayout } from '@/admin/layout/AdminLayout';
import { AdminPage } from '@/admin/pages/AdminPage';
import { HeroesLayout } from '@/heroes/layout/HeroesLayout';
import { HeroePage } from '@/heroes/pages/hero/HeroePage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router'; // <-- 1. Importa Navigate

// eslint-disable-next-line react-refresh/only-export-components
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'heroes',
                element: <HomePage />,
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroePage />,
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />,
            },
        ],
    },
    // 2. Agrega la ruta comodín al final
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);