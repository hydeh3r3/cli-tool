import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log('Please provide a location area name');
        return;
    }

    const locationName = args[0];
    console.log(`Exploring ${locationName}...`);
    
    const location = await state.pokeapi.fetchLocation(locationName);
    console.log('Found Pokemon:');
    location.pokemon_encounters.forEach(encounter => {
        console.log(` - ${encounter.pokemon.name}`);
    });
} 