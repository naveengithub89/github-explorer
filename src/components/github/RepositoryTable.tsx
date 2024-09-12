import React, { useMemo } from 'react';
import { Repository, SortOption, OrderOption } from 'types';
import { getSortStrategy } from 'utils/sortStrategies';
import { getAriaSortValue } from 'utils/ariaHelpers';

interface RepositoryTableProps {
    repositories: Repository[];
    sort: SortOption;
    order: OrderOption;
    onSortChange: (sort: SortOption) => void;
    onOrderChange: (order: OrderOption) => void;
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({
    repositories,
    sort,
    order,
    onSortChange,
    onOrderChange,
}) => {
    const handleSort = (newSort: SortOption) => {
        if (newSort === sort) {
            onOrderChange(order === 'asc' ? 'desc' : 'asc');
        } else {
            onSortChange(newSort);
            onOrderChange('desc');
        }
    };

    const SortArrow = ({ column }: { column: SortOption }) => {
        if (sort !== column) return null;
        return <span className="ml-1" aria-hidden="true">{order === 'asc' ? '▲' : '▼'}</span>;
    };

    const sortedRepositories = useMemo(() => {
        const sortStrategy = getSortStrategy(sort);
        return [...repositories].sort((a, b) => {
            const result = sortStrategy(a, b);
            return order === 'asc' ? result : -result;
        });
    }, [repositories, sort, order]);

    return (
        <table className="w-full border-collapse border">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2 text-left">
                        <button
                            onClick={() => handleSort('full_name')}
                            className="font-bold"
                            aria-sort={getAriaSortValue('full_name', sort, order)}
                        >
                            Name <SortArrow column="full_name" />
                        </button>
                    </th>
                    <th className="border p-2 text-left">
                        <button
                            className="font-bold"
                            aria-sort={getAriaSortValue('description', sort, order)}
                        >
                            Description
                        </button>
                    </th>
                    <th className="border p-2 text-left">
                        <button
                            onClick={() => handleSort('stargazers_count')}
                            className="font-bold"
                            aria-sort={getAriaSortValue('stargazers_count', sort, order)}
                        >
                            Stars <SortArrow column="stargazers_count" />
                        </button>
                    </th>
                    <th className="border p-2 text-left">
                        <button
                            onClick={() => handleSort('updated')}
                            className="font-bold"
                            aria-sort={getAriaSortValue('updated', sort, order)}
                        >
                            Last Updated <SortArrow column="updated" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedRepositories.map((repo) => (
                    <tr key={repo.id} className="hover:bg-gray-50">
                        <td className="border p-2">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {repo.full_name}
                            </a>
                        </td>
                        <td className="border p-2">{repo.description}</td>
                        <td className="border p-2">{repo.stargazers_count.toLocaleString()}</td>
                        <td className="border p-2">{new Date(repo.updated_at).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default React.memo(RepositoryTable);