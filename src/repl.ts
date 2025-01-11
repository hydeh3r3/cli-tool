import * as readline from 'readline';

/**
 * Cleans and splits input string into array of words
 * @param input - Raw input string from user
 * @returns Array of cleaned words
 */
export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/\s+/);
}

/**
 * Starts the REPL (Read-Eval-Print-Loop) interface
 */
export function startREPL(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    rl.prompt();

    rl.on('line', (input: string) => {
        const words = cleanInput(input);
        
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
}