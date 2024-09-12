import React from 'react';
import { PaginationLinks } from 'types';
import { Button } from 'components/common/button';

interface PaginationProps {
    paginationLinks: PaginationLinks;
    onPageChange: (url: string) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    paginationLinks,
    onPageChange,
}) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <Button
                onClick={() => paginationLinks.first && onPageChange(paginationLinks.first)}
                disabled={!paginationLinks.first}
            >
                First
            </Button>
            <Button
                onClick={() => paginationLinks.prev && onPageChange(paginationLinks.prev)}
                disabled={!paginationLinks.prev}
            >
                Previous
            </Button>
            <Button
                onClick={() => paginationLinks.next && onPageChange(paginationLinks.next)}
                disabled={!paginationLinks.next}
            >
                Next
            </Button>
            <Button
                onClick={() => paginationLinks.last && onPageChange(paginationLinks.last)}
                disabled={!paginationLinks.last}
            >
                Last
            </Button>
        </div>
    );
};