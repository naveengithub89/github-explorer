import { PaginationLinks } from "types";

export const parseLinkHeaderForPagination = (header: string): PaginationLinks => {
    const links: PaginationLinks = {};
    const parts = header.split(',');
    parts.forEach(part => {
        const section = part.split(';');
        if (section.length !== 2) {
            return;
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name as keyof PaginationLinks] = url;
    });
    return links;
}