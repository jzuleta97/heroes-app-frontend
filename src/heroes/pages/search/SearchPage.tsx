import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { searchHeroAction } from "@/heroes/actions/search-hero.action"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { HeroStats } from "@/heroes/components/HeroStats"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { SearchControls } from "./ui/SearchControls"

const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') ?? '';
    const strength = (searchParams.get('strength') ?? '0');

    const { data: searchData } = useQuery({
        queryKey: ['search-information', { name, strength }],
        queryFn: () => searchHeroAction({ name, strength }),
        staleTime: 1000 * 60 * 5
    })

    console.log(searchData);

    return (
        <>
            {/* Header */}
            <CustomJumbotron title="Search Hero" description="Discover, explore, and manage your favorite superheroes and villains" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Controls and Advanced Filters*/}
            <SearchControls />

            {/* Character Grid */}
            <HeroGrid heroes={searchData ?? []} />

        </>
    )
}

export default SearchPage