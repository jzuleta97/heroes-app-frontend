import { heroApi } from '../api/hero.api';
import type { Hero } from '../interfaces/hero.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
	name?: string;
	team?: string;
	category?: string;
	universe?: string;
	status?: string;
	strength?: string;
}

export const searchHeroAction = async (options: Options = {}) => {
	// Filtra las propiedades undefined o vacías
	const params = Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined && value !== ''));
	const { data } = await heroApi.get<Hero[]>('/search', { params });

	return data.map((hero) => ({
		...hero,
		image: `${BASE_URL}/images/${hero.image}`
	}));
};
