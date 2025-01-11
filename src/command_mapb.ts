import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("You're on the first page");
        return;
    }
    
    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    
    locations.results.forEach(location => {
        console.log(location.name);
    });
} 