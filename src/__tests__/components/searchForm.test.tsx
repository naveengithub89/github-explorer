import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from 'components/github/SearchForm';

describe('SearchForm', () => {
    it('calls onSearch with input value when form is submitted', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText('Enter GitHub username or organization');
        const submitButton = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'testuser' } });
        fireEvent.click(submitButton);

        expect(mockOnSearch).toHaveBeenCalledWith('testuser');
    });
});