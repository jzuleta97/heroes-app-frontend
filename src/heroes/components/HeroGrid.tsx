
import type { Hero } from "../interfaces/hero.interface"
import { HeroGridCard } from "./HeroGridCard"

interface heroeHeroGridsProps {
    heroes: Hero[]
}

export const HeroGrid = ({ heroes }: heroeHeroGridsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Hero Card 1 - Superman */}
            {heroes.map((hero, index) => (
                <HeroGridCard key={index} hero={hero} />
            ))
            }
        </div>
    )
}
