// utils.ts

export const fetchMoviesFromJSON = async (): Promise<any> => {
    try {
        const data = await import('../src/json/movies.json');
        return data.default;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
