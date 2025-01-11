export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
};

export type Location = {
    id: number;
    name: string;
    names: Array<{
        name: string;
        language: {
            name: string;
            url: string;
        };
    }>;
}; 