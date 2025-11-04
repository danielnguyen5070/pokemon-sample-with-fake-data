import type { Pokemon } from '../types/pokemonTypes';
import { getPokemonImageUrl } from '../utils/pokemonUtils';

export function PokemonItem({ p }: { p: Pokemon }) {
    return (
        <div
            key={p.name}
            className="bg-white rounded-2xl shadow-md p-4 text-center hover:scale-105 transition-transform"
        >
            <img
                src={getPokemonImageUrl(p.url)}
                alt={p.name}
                className="w-28 h-28 mx-auto mb-3"
                loading="lazy"
            />
            <h2 className="text-lg text-gray-600 font-semibold capitalize">{p.name}</h2>
        </div>
    )
}