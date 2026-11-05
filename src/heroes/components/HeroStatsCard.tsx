import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";

interface HeroStatsCardProps extends PropsWithChildren {
    title: string;
    icon: JSX.Element;

}
export const HeroStatsCard = ({ title, icon, children }: HeroStatsCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}