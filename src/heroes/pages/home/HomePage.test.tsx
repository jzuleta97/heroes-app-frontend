import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { usePaginatedHero } from "@/heroes/hooks/usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";

vi.mock('@/heroes/hooks/usePaginateHero');

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );
}

describe('HomePage', () => {
    beforeEach(() => {
        mockUsePaginatedHero.mockClear();
    });

    test('should render the HomePage component', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should call usePaginatedHero with default values', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    })

    test('should call usePaginatedHero with custom values', () => {
        renderHomePage(["/?tab=favorites&page=2&limit=10&category=heroes"]);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'heroes');
    });

    test('should call usePaginatedHero with default page and same limit on tab click', () => {
        renderHomePage(["/?tab=favorites&page=2&limit=10"]);

        const [, , , villainsTab] = screen.getAllByRole('tab');

        fireEvent.click(villainsTab);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
    });
});