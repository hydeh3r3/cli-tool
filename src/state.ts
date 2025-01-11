import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
        },
        explore: {
            name: "explore",
            description: "Explore a location area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Try to catch a Pokemon",
            callback: commandCatch,
        },
        pokedex: {
            name: "pokedex",
            description: "View all caught Pokemon",
            callback: commandPokedex,
        },
    };

    return { 
        rl, 
        commands, 
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {}
    };
} 