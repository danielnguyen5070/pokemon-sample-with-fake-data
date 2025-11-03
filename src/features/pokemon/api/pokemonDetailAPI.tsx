import type { PokemonDetail } from "../types/pokemonTypes";

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Failed to fetch Pokémon detail");
    return res.json();
};