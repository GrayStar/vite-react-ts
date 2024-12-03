export interface PokemonApiLink {
	name: string;
	url: string;
}

export interface PokemonDetailModel {
	abilities: {
		ability: PokemonApiLink;
		is_hidden: boolean;
		slot: number;
	}[];
	base_experience: number;
	cries: {
		latest: string;
		legacy: string;
	};
	forms: PokemonApiLink[];
	game_indices: {
		game_index: number;
		version: PokemonApiLink;
	}[];
	height: number;
	held_items: {
		item: PokemonApiLink;
		version_details: {
			rarity: number;
			version: PokemonApiLink;
		}[];
	}[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: {
		move: PokemonApiLink;
		version_group_details: {
			level_learned_at: number;
			move_learn_method: PokemonApiLink;
			version_group: PokemonApiLink;
		}[];
	}[];
	name: string;
	order: number;
	past_abilities: [];
	past_types: [];
	species: PokemonApiLink;
	sprites: {
		back_default?: string;
		back_female?: string;
		back_shiny?: string;
		back_shiny_female?: string;
		front_default?: string;
		front_female?: string;
		front_shiny?: string;
		front_shiny_female?: string;
		other: Record<string, { [x: string]: string }>;
		versions: Record<string, { [x: string]: { [x: string]: string } }>;
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: PokemonApiLink;
	}[];
	types: {
		slot: number;
		type: PokemonApiLink;
	}[];
	weight: number;
}
