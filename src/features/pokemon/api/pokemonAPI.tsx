import type { Pokemon } from "../types/pokemonTypes";

// Fetch list of Pokémon with detail data
export const fetchAllPokemon = async (limit: number = 20): Promise<Pokemon[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch Pokémon list");
    const data = await res.json();
    return data.results as Promise<Pokemon[]>;

};

export function getPokemonImageUrl(pokemonUrl: string) {
    const id = pokemonUrl.split('/').filter(Boolean).pop(); // get last number
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}