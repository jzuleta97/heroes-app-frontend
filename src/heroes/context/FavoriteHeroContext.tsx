import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { Hero } from '../interfaces/hero.interface';

interface FavoriteHeroContext {
    //State
    favorites: Hero[]
    favoriteCount: number;

    //Methos
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext)

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());
    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id)

        if (heroExist) setFavorites(favorites.filter(h => h.id !== heroExist.id))
        else setFavorites([...favorites, hero])

    }

    const isFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))

    }, [favorites])

    const value = {
        favoriteCount: favorites.length,
        favorites,
        toggleFavorite,
        isFavorite
    }

    return <FavoriteHeroContext.Provider value={value}> {children} </FavoriteHeroContext.Provider>
}