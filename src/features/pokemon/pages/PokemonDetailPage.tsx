// src/features/pokemon/pages/PokemonDetail.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import type { RootState } from "@app/store/store";
import { fetchPokemonDetailRequest } from "../slices/pokemonDetailSlice";
import { startAutoRefresh, stopAutoRefresh } from "../slices/pokemonDetailSlice";

export const PokemonDetailPage = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.pokemonDetail);

    useEffect(() => {
        if (name) dispatch(fetchPokemonDetailRequest(name));
    }, [name, dispatch]);


    useEffect(() => {
        // kick off auto-refresh for this Pokémon
        if (name) dispatch(startAutoRefresh(name));

        // cancel polling when leaving the page/component
        return () => {
            dispatch(stopAutoRefresh());
        };
    }, [dispatch, name]);

    if (loading) return <p>Loading Pokémon detail...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data found.</p>;

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
