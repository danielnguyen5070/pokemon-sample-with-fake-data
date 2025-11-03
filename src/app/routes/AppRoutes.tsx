import { Routes, Route } from "react-router-dom";
import { PokemonDetailPage } from "@features/pokemon/pages/PokemonDetailPage";
import PokemonPage from "@features/pokemon";

export const AppRoutes = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <h1 className="text-3xl font-bold text-center py-6 text-blue-700">Pokédex</h1>
        <Routes>
            <Route path="/" element={<PokemonPage />} />
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        </Routes>
    </div>

);
