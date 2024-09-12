import { useQuery } from 'react-query';
import { fetchRepositories } from 'services/api';
import { SortOption, OrderOption } from 'types/index';
import { useAuth } from 'context/AuthContext';

export const useGitHubApi = (
    searchTerm: string,
    page: number,
    perPage: number,
    sort: SortOption,
    order: OrderOption
) => {
    const { accessToken } = useAuth();

    return useQuery(
        ['repositories', searchTerm, page, perPage, sort, order, accessToken],
        () => fetchRepositories(searchTerm, page, perPage, sort, order, accessToken),
        {
            enabled: !!searchTerm,
            keepPreviousData: true,
        }
    );
};