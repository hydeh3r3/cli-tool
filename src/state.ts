import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    const commands: Record<string, CLICommand> = {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Display next 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Display previous 20 location areas",
            callback: commandMapBack,
        }
    };

    return { 
        rl, 
        commands, 
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null
    };
} 