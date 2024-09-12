import { Repository, SortOption } from 'types';

type SortStrategy = (a: Repository, b: Repository) => number;

const sortStrategies: Record<SortOption, SortStrategy> = {
    full_name: (a, b) => a.full_name.localeCompare(b.full_name),
    stargazers_count: (a, b) => b.stargazers_count - a.stargazers_count,
    updated: (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
};

export const getSortStrategy = (sortOption: SortOption): SortStrategy => {
    return sortStrategies[sortOption];
};