import type { State } from './state.js';

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
    state.rl.prompt();

    state.rl.on('line', (input: string) => {
        const words = cleanInput(input);
        
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }

        const command = state.commands[words[0]];
        if (command) {
            command.callback(state);
        } else {
            console.log('Unknown command');
        }
        
        state.rl.prompt();
    });

    state.rl.on('close', () => {
        state.commands.exit.callback(state);
    });
}