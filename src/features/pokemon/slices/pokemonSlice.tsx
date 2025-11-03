import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAllPokemon } from '../api/pokemonAPI';
import type { Pokemon } from '../types/pokemonTypes';

export interface PokemonState {
    pokemons: Pokemon[];
    status: 'idle' | 'loading' | 'failed';
    searchTerm: string;
}

const initialState: PokemonState = {
    pokemons: [],
    status: 'idle',
    searchTerm: '',
};

export const getPokemons = createAsyncThunk<Pokemon[]>(
    'pokemon/fetch',
    async () => {
        return await fetchAllPokemon(50); // load 50 for easier searching
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pokemons = action.payload;
            })
            .addCase(getPokemons.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setSearchTerm } = pokemonSlice.actions;
export default pokemonSlice.reducer;
