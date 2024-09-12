import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialPerPage = 10) => {
    const [page, setPage] = useState(initialPage);
    const [perPage, setPerPage] = useState(initialPerPage);

    const goToPage = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const changePerPage = useCallback((newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    }, []);

    return {
        page,
        perPage,
        setPage: goToPage,
        setPerPage: changePerPage,
    };
};