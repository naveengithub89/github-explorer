import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RepositoryTable from 'components/github/RepositoryTable';
import { Repository } from '../../types';

describe('RepositoryTable', () => {
    const mockRepositories: Repository[] = [
        { id: 1, full_name: 'user/repo1', stargazers_count: 10, updated_at: '2023-01-01T00:00:00Z', html_url: 'https://github.com/user/repo1', description: 'test1' },
        { id: 2, full_name: 'user/repo2', stargazers_count: 20, updated_at: '2023-02-01T00:00:00Z', html_url: 'https://github.com/user/repo2', description: 'test2' },
    ];

    it('renders repository data correctly', () => {
        render(
            <RepositoryTable
                repositories={mockRepositories}
                sort="full_name"
                order="asc"
                onSortChange={() => { }}
                onOrderChange={() => { }}
            />
        );

        expect(screen.getByText('user/repo1')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('calls onSortChange when a column header is clicked', () => {
        const mockOnSortChange = jest.fn();
        render(
            <RepositoryTable
                repositories={mockRepositories}
                sort="full_name"
                order="asc"
                onSortChange={mockOnSortChange}
                onOrderChange={() => { }}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /stars/i }));
        expect(mockOnSortChange).toHaveBeenCalledWith('stargazers_count');
    });
});