import { PaginationInfo, PokemonDetail } from '../models/types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a paginated list of Pokemon
 * @param limit Number of Pokemon to fetch
 * @param offset Starting index
 * @returns Promise with pagination info and results
 */
export async function getPokemonList(limit = 12, offset = 0): Promise<PaginationInfo> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  return await response.json();
}

/**
 * Fetches detailed information about a specific Pokemon
 * @param identifier Pokemon ID or name
 * @returns Promise with Pokemon details
 */
export async function getPokemonDetail(identifier: string | number): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${identifier}`);
  }
  
  return await response.json();
}

/**
 * Searches for Pokemon by name
 * @param name Pokemon name to search for
 * @returns Promise with matching Pokemon
 */
export async function searchPokemon(name: string): Promise<PokemonDetail[]> {
  // First get a list of all Pokemon (limited to first 900 for performance)
  const allPokemon = await getPokemonList(900, 0);
  
  // Filter the Pokemon by name
  const filteredPokemon = allPokemon.results.filter(pokemon => 
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // Fetch details for each matching Pokemon
  const detailPromises = filteredPokemon.map(pokemon => 
    getPokemonDetail(pokemon.name)
  );
  
  return Promise.all(detailPromises);
}