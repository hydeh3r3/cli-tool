import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
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
        }
    };

    return { rl, commands };
} 