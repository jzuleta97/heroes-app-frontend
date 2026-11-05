import { searchHeroAction } from "@/heroes/actions/search-hero.action";
import type { Hero } from "@/heroes/interfaces/hero.interface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";

vi.mock("@/heroes/actions/search-hero.action");
const mockSearchHeroAction = vi.mocked(searchHeroAction);

vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: ({ title, description }: { title: string, description: string }) => (
        <div data-testid="custom-jumbotron">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}));

vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="search-controls">SearchControls</div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
        <div data-testid="hero-grid">
            ({heroes.map(hero => (
                <div key={hero.id} data-testid="hero-card">
                    <h2>{hero.name}</h2>
                </div>
            ))})
        </div>
    )
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ["/"]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    );
}

describe('SearchPage', () => {
    beforeEach(() => {
        mockSearchHeroAction.mockClear();
    });

    test('should render the SearchPage component', () => {
        const { container } = renderSearchPage();

        expect(mockSearchHeroAction).toHaveBeenCalledWith({ name: '', strength: '0' });

        expect(container).toMatchSnapshot();
    });

    test('should call searchHeroAction with name parameter', () => {
        renderSearchPage(["/?name=batman"]);
        expect(mockSearchHeroAction).toHaveBeenCalledWith({ name: 'batman', strength: '0' });
    });

    test('should call searchHeroAction with strength parameter', () => {
        renderSearchPage(["/?strength=100"]);
        expect(mockSearchHeroAction).toHaveBeenCalledWith({ name: '', strength: '100' });
    });

    test('should render HeroGrid with search results', async () => {
        const mockHeroes: Hero[] = [
            { id: '1', name: 'Batman', strength: 85, category: 'hero' } as Hero,
            { id: '2', name: 'Joker', strength: 70, category: 'villain' } as Hero,
        ];
        mockSearchHeroAction.mockResolvedValue(mockHeroes);

        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Batman')).toBeDefined();
            expect(screen.getByText('Joker')).toBeDefined();
        });

        screen.debug(screen.getByTestId('hero-grid'));
    });
});