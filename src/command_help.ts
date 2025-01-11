import type { State } from "./state.js";

export function commandHelp(state: State): void {
    console.log('Welcome to the Pokedex!');
    console.log('Usage:\n');
    
    Object.values(state.commands).forEach(command => {
        console.log(`${command.name}: ${command.description}`);
    });
} 