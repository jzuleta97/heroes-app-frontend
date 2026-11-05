import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router";

interface BreadcrumbEntry {
    to: string;
    label: string;
    isLast: boolean;
}

// 1. Función utilitaria fuera del componente (fácil de testear y reutilizar)
const generateBreadcrumbs = (pathname: string): BreadcrumbEntry[] => {
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
        const cleanText = segment.replace(/-/g, " ");
        const label = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);

        return {
            to: `/${segments.slice(0, index + 1).join("/")}`,
            label,
            isLast: index === segments.length - 1,
        };
    });
}

export const CustomBreadcrumbs = () => {
    const { pathname } = useLocation();

    // 2. Transforma los datos antes del render (solo se recalcula si cambia pathname)
    const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {/* 3. El JSX queda limpio, declarativo y solo enfocado en pintar */}
                {breadcrumbs.map(({ to, label, isLast }) => (
                    <React.Fragment key={to}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink>
                                    <Link to={to}>{label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};