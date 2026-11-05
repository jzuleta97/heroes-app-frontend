import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { HeroStats } from "@/heroes/components/HeroStats"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginateHero"
import { Heart } from "lucide-react"
import { use, useMemo } from "react"
import { useSearchParams } from "react-router"

// type TypeTab = 'all' | 'favorites' | 'heroes' | 'villains'

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains']

        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab])

    // const [activeTab, setActiveTab] = useState<TypeTab>();

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)

    const { data: summary } = useHeroSummary()

    return (
        <>
            {/* Header */}
            <CustomJumbotron title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all"
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'all')
                            prev.set('category', 'all')
                            prev.set('page', '1')
                            return prev
                        })}>All Characters ({summary?.totalHeroes})
                    </TabsTrigger>
                    <TabsTrigger value="favorites"
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'favorites')
                            return prev
                        })} className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Favorites ({favoriteCount})
                    </TabsTrigger>
                    <TabsTrigger value="heroes"
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'heroes')
                            prev.set('category', 'hero')
                            prev.set('page', '1')
                            return prev
                        })}>Heroes ({summary?.heroCount})</TabsTrigger>
                    <TabsTrigger value="villains"
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'villains')
                            prev.set('category', 'villain')
                            prev.set('page', '1')
                            return prev
                        })}>Villains ({summary?.villainCount})</TabsTrigger>
                </TabsList>


                <TabsContent value='all'>
                    <h1>Todos los personaes</h1>

                    {/* Character Grid */}
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>
                <TabsContent value='favorites'>
                    <h1>Favoritos!!</h1>

                    {/* Character Grid */}
                    <HeroGrid heroes={favorites ?? []} />
                </TabsContent>
                <TabsContent value='heroes'>
                    <h1>Heroes</h1>

                    {/* Character Grid */}
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>
                <TabsContent value='villains'>
                    <h1>Villains</h1>

                    {/* Character Grid */}
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>
            </Tabs>

            {/* Results info */}
            {/* <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <p className="text-gray-600">Showing 6 of 16 characters</p>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Filter className="h-3 w-3" />
                        Filtered
                    </Badge>
                </div>
            </div> */}

            {/* Pagination */}
            {selectedTab !== 'favorites' && (
                < CustomPagination totalPages={heroesResponse?.pages ?? 1} />
            )}
        </>
    )
}