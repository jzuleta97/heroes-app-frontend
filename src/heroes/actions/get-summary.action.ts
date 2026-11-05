import { heroApi } from '../api/hero.api';
import type { HeroSummary } from '../interfaces/getHeroSummary';

export const getSummaryAction = async () => {
	const { data } = await heroApi.get<HeroSummary>('/summary');

	return data;
};
