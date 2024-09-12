export const errorHandler = (error: unknown) => {
    if (error instanceof Error) {
        console.error('An error occurred:', error.message);
    } else {
        console.error('An unknown error occurred');
    }
};