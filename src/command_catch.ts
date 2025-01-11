import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log('Please provide a Pokemon name');
        return;
    }

    const pokemonName = args[0].toLowerCase();
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    try {
        const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
        
        // Higher base experience = lower catch rate
        const catchRate = 1 - (pokemon.base_experience / 600); // max base_exp is roughly 600
        const caught = Math.random() < catchRate;

        if (caught) {
            console.log(`${pokemonName} was caught!`);
            console.log('You may now inspect it with the inspect command.');
            state.pokedex[pokemonName] = pokemon;
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
    }
} 