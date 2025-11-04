import { useState } from 'react';
import Loader from '../../shared/components/Loader';
import { PokemonItem } from './components/PokemonItem';
import { Link } from "react-router-dom";
import { pokemons } from './data/pokemonData';
const PokemonList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredPokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!pokemons) return <Loader />;

    return (
        <div className="p-6">
            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border bg-white text-gray-700 border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Pokémon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {filteredPokemons.length > 0 ? (
                    filteredPokemons.map((p) => (
                        <Link
                            to={`/pokemon/${p.name}`}
                            key={p.name}
                        >
                            <PokemonItem key={p.name} p={p} />
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No Pokémon found 😢
                    </p>
                )}
            </div>
        </div>
    );
};

export default PokemonList;
