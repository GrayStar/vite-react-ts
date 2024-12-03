import { httpSingleton } from '@/lib/http-client';
import { PokemonApiLink, PokemonDetailModel } from '@/lib/models';

export const pokeService = {
	getPokemon(params?: { offset?: number; limit?: number }) {
		return httpSingleton.createRequest<{
			count: number;
			next?: string;
			previous?: string;
			results: PokemonApiLink[];
		}>({
			method: 'get',
			url: 'pokemon',
			params,
		});
	},
	getPokemonByName(name: string) {
		return httpSingleton.createRequest<PokemonDetailModel>({
			method: 'get',
			url: `pokemon/${name}`,
		});
	},
};
