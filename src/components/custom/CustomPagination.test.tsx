import { fireEvent, render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    ),
}));

const renderWithRouter = (component: React.ReactElement, initialEntries: string[] = ['/']) => {
    return render(<MemoryRouter initialEntries={initialEntries}> {component} </MemoryRouter>);
}

describe('CustomPagination', () => {
    test('should render correctly with totalPages prop', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);

        expect(screen.getByText('Anteriores')).toBeDefined();
        expect(screen.getByText('Siguientes')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
    });

    test('should disable "Anteriores" button on first page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);

        const previousButton = screen.getByText('Anteriores');
        expect(previousButton.getAttributeNames()).toContain('disabled');

    });

    test('should disable "Siguientes" button on last page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/search?page=5']);
        const nextButton = screen.getByText('Siguientes');
        expect(nextButton.getAttributeNames()).toContain('disabled');
    });

    test('should change page when clicking on page buttons', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/search?page=2']);

        const page2Button = screen.getByText('2');
        const page3Button = screen.getByText('3');

        expect(page2Button.getAttribute('variant')).toBe('default');
        expect(page3Button.getAttribute('variant')).toBe('outline');
    });

    test('should change page when click on number buttons', () => {
        renderWithRouter(<CustomPagination totalPages={10} />, ['/search?page=3']);

        const page2Button = screen.getByText('2');
        const page3Button = screen.getByText('3');

        expect(page2Button.getAttribute('variant')).toBe('outline');
        expect(page3Button.getAttribute('variant')).toBe('default');

        fireEvent.click(page2Button);

        expect(page2Button.getAttribute('variant')).toBe('default');
        expect(page3Button.getAttribute('variant')).toBe('outline');
    });
});