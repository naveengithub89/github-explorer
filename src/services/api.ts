import axios from 'axios';
import { ApiResponse, SortOption, OrderOption } from 'types/index';
import { parseLinkHeaderForPagination } from 'utils/helper';

const API_BASE_URL = 'https://api.github.com';

export const fetchRepositories = async (
    userName: string,
    page: number,
    perPage: number,
    sort: SortOption,
    order: OrderOption,
    accessToken: string | null
): Promise<ApiResponse> => {

    if (!userName) {
        return {
            total_count: 0,
            items: [],
            paginationLinks: {}
        }
    }
    const headers: Record<string, string> = {};
    if (accessToken) {
        headers['Authorization'] = `token ${accessToken}`;
    }

    const response = await axios.get(`${API_BASE_URL}/users/${userName}/repos`, {
        params: {
            page,
            per_page: perPage,
            sort,
            order,
        },
        headers,
    });

    const linkHeader = response.headers['link'];
    const paginationLinks = linkHeader ? parseLinkHeaderForPagination(linkHeader) : {}



    return {
        items: response.data,
        total_count: response.data?.length,
        paginationLinks
    }
};