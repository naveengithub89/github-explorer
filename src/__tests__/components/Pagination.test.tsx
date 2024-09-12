import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Pagination } from 'components/github/Pagination';

describe('Pagination', () => {
    const mockPaginationLinks = {
        next: 'https://api.github.com/repositories/1300192/issues?page=3',
        prev: 'https://api.github.com/repositories/1300192/issues?page=1',
        first: 'https://api.github.com/repositories/1300192/issues?page=1',
        last: 'https://api.github.com/repositories/1300192/issues?page=5',
    };

    it('renders pagination buttons correctly', () => {
        render(<Pagination paginationLinks={mockPaginationLinks} onPageChange={() => { }} />);

        expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /last/i })).toBeInTheDocument();
    });

    it('calls onPageChange with correct URL when a button is clicked', () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination paginationLinks={mockPaginationLinks} onPageChange={mockOnPageChange} />);

        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        expect(mockOnPageChange).toHaveBeenCalledWith('https://api.github.com/repositories/1300192/issues?page=3');
    });

    it('disables buttons when corresponding links are not available', () => {
        const partialLinks = { next: 'https://api.github.com/repositories/1300192/issues?page=3' };
        render(<Pagination paginationLinks={partialLinks} onPageChange={() => { }} />);

        expect(screen.getByRole('button', { name: /first/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
        expect(screen.getByRole('button', { name: /last/i })).toBeDisabled();
    });
});