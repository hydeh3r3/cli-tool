export function cleanInput(input: string): string[] {
    return input.split(" ").filter(Boolean);
  }