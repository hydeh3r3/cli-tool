import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor() {
        this.cache = new Cache(1000 * 60 * 5); // 5 minutes cache
    }

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
            console.log('Cache hit!');
            return cached;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
        if (cached) {
            console.log('Cache hit!');
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get<Pokemon>(url);
        if (cached) {
            console.log('Cache hit!');
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pokemon ${pokemonName} not found!`);
        }
        const data = await response.json();
        this.cache.add(url, data);
        return data;
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
    pokemon_encounters: Array<{
        pokemon: {
            name: string;
            url: string;
        };
        version_details: Array<{
            encounter_details: Array<{
                chance: number;
                method: {
                    name: string;
                    url: string;
                };
            }>;
        }>;
    }>;
};

export type Pokemon = {
    name: string;
    height: number;
    weight: number;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        };
    }>;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    base_experience: number;
}; 