//Defining Pokemon for use across the app
export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;

}

export interface Move {
    move: {
      name: string;
      url: string;
    };
  }


export interface AppState {
    pokemonList: Pokemon[];
    loading: boolean;
    error: string | null;
}

