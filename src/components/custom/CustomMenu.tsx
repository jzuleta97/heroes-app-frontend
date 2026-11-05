
import { cn } from 'cn';
import { Link, useLocation } from 'react-router';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';

export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (pathName: string) => pathName === pathname

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md')} render={<Link to="/" />} >
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(isActive('/search') && 'bg-slate-200¿', 'p-2 rounded-md')} render={<Link to="/search" />} >
                        Search
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>

        </NavigationMenu>
    )
}
