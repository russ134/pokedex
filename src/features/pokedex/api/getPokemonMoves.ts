import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getPokemonMoves = async () => {
  try {
    const response = await api.get('/move/{$index + 1}');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};