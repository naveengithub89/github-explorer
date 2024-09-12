import React, { useState, useCallback } from 'react';
import SearchForm from 'components/github/SearchForm';
import RepositoryTable from 'components/github/RepositoryTable';
import { Pagination } from 'components/github/Pagination';
import { useGitHubApi } from 'hooks/useGithubApi';
import { SortOption, OrderOption } from 'types';
import { usePagination } from 'hooks/usePagination';
import ErrorBoundary from 'components/ErrorBoundary';


const RepoFetcher: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState<SortOption>('updated');
    const [order, setOrder] = useState<OrderOption>('desc');

    const { page, perPage, setPage } = usePagination();

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setPage(1);
    }, [setPage]);

    const { data, isLoading } = useGitHubApi(searchTerm, page, perPage, sort, order);
    
    const handlePageChange = useCallback((url: string) => {
        const parsedUrl = new URL(url);
        const newPage = parsedUrl.searchParams.get('page');
        if (newPage) {
            setPage(parseInt(newPage, 10));
        }
    }, []);



    return (
        <ErrorBoundary>
            <div className="space-y-4">
                <SearchForm onSearch={handleSearch} />
                {isLoading && <p className="text-center">Loading...</p>}
                {data && (
                    <>
                        <RepositoryTable
                            repositories={data.items}
                            sort={sort}
                            order={order}
                            onSortChange={setSort}
                            onOrderChange={setOrder}
                        />
                        <Pagination
                            paginationLinks={data.paginationLinks}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default RepoFetcher;
