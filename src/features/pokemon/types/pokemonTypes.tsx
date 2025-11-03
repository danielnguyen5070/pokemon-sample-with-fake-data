export interface PokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    types: PokemonType[];
    stats: PokemonStat[];
}

export interface Pokemon {
    name: string;
    url: string;
}
