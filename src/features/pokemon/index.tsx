import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { getPokemons, setSearchTerm } from './slices/pokemonSlice';
import Loader from '../../shared/components/Loader';
import { PokemonDetail } from './components/PokemonItem';
import { Link } from "react-router-dom";

const PokemonList = () => {
    const dispatch = useAppDispatch();
    const { pokemons, status, searchTerm } = useAppSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    console.log('Rendered PokemonList with', pokemons);
    const filteredPokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading') return <Loader />;
    if (status === 'failed')
        return <p className="text-center text-red-500 mt-4">Failed to load Pokémon.</p>;

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
                            <PokemonDetail key={p.name} p={p} />
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
