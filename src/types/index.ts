export interface Repository {
    id: number;
    full_name: string;
    stargazers_count: number;
    updated_at: string;
    html_url: string;
    description: string;
}

export type SortOption = 'full_name' | 'stargazers_count' | 'updated';
export type OrderOption = 'asc' | 'desc';

export interface ApiResponse {
    total_count: number;
    items: Repository[];
    paginationLinks: PaginationLinks;
}

export interface PaginationLinks {
    next?: string;
    prev?: string;
    first?: string;
    last?: string;
}