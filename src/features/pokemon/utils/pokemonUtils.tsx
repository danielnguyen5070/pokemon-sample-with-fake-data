export function getPokemonImageUrl(pokemonUrl: string) {
    const id = pokemonUrl.split('/').filter(Boolean).pop(); // get last number
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}