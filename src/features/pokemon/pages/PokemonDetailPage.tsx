import { Link } from "react-router-dom";
import { PokemonDetail as data } from "../data/pokemonData";

export const PokemonDetailPage = () => {
    return (
        <div className="min-h-screen p-8">
            <Link
                to="/"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6"
            >
                ← Back to list
            </Link>

            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/40">

                <div className="flex justify-center">
                    <img
                        src={data.sprites.front_default}
                        alt={data.name}
                        className="w-40 h-40 drop-shadow-lg hover:scale-110 transition-transform duration-200"
                    />
                </div>

                <h2 className="mt-4 text-4xl font-extrabold capitalize text-center text-gray-800 tracking-wide">
                    {data.name}
                </h2>

                <div className="mt-6 flex justify-center gap-6 text-gray-700">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-wider text-gray-500">Height</p>
                        <p className="text-xl font-semibold">{data.height}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-wider text-gray-500">Weight</p>
                        <p className="text-xl font-semibold">{data.weight}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
