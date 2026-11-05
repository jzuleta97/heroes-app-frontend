import { fireEvent, render, screen } from "@testing-library/react";
import { use } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Hero } from "../interfaces/hero.interface";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";

const mockHero = {
    id: '1',
    name: 'Batman'
} as Hero;

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count"> {favoriteCount} </div>

            <div data-testid="favorite-list">
                {
                    favorites.map(hero => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>

            <button data-testid="toggle-favorite" onClick={() => toggleFavorite(mockHero)}>Toggle Favorite</button>

            <div data-testid="is-favorite"> {isFavorite(mockHero).toString()} </div>

        </div>
    )
};

const renderContextTest = () => {
    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('FavoriteHeroContext2', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    })

    test('should initialize with deafult values', () => {
        renderContextTest();

        screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe(' 0 ');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0)
    });

    test('should add hero to favorites when toggleFavorite is called with a new hero', () => {
        renderContextTest();

        const btn = screen.queryByTestId('toggle-favorite')!;
        fireEvent.click(btn);

        screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe(' 1 ');
        expect(screen.getByTestId('is-favorite').textContent).toBe(" true ");
        expect(screen.getByTestId('hero-1').textContent).toBe("Batman");
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[{"id":"1","name":"Batman"}]');
    });

    test('should remove hero to favorites when toggleFavorite is called with a new hero', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]))

        renderContextTest();

        const btn = screen.queryByTestId('toggle-favorite')!;
        fireEvent.click(btn);

        screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe(' 0 ');
        expect(screen.getByTestId('is-favorite').textContent).toBe(" false ");
        expect(screen.queryByTestId('hero-1')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
    });
});