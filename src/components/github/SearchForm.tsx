import React, { useState } from 'react';

interface SearchFormProps {
    onSearch: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Enter GitHub username or organization"
                className="border p-2 mr-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                Search
            </button>
            <span> </span>
            <button 
                type="button" 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                onClick = {(e) => {
                    setTerm('')
                }}
                >
                Clear
            </button>
        </form>
    );
};

export default SearchForm;