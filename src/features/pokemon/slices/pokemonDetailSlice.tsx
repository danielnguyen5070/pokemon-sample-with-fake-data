import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PokemonDetail } from "../types/pokemonTypes";

interface PokemonDetailState {
    data: PokemonDetail | null;
    loading: boolean;
    error?: string;
}

const initialState: PokemonDetailState = {
    data: null,
    loading: false,
};

const pokemonDetailSlice = createSlice({
    name: "pokemonDetail",
    initialState,
    reducers: {
        fetchPokemonDetailRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = undefined;
        },
        fetchPokemonDetailSuccess: (state, action: PayloadAction<PokemonDetail>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchPokemonDetailFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        startAutoRefresh: (_state, _action: PayloadAction<string>) => { },
        stopAutoRefresh: () => { },
    },
});

export const {
    fetchPokemonDetailRequest,
    fetchPokemonDetailSuccess,
    fetchPokemonDetailFailure,
    startAutoRefresh,
    stopAutoRefresh,
} = pokemonDetailSlice.actions;

export default pokemonDetailSlice.reducer;
