import { OrderOption } from '../types';

export const getAriaSortValue = (column: string, currentSort: string, order: OrderOption): "ascending" | "descending" | "none" => {
    if (column !== currentSort) {
        return "none";
    }
    return order === 'asc' ? "ascending" : "descending";
};