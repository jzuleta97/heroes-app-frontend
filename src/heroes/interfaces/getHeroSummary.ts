import type { Hero } from './hero.interface';

export interface HeroSummary {
	totalHeroes: number;
	strongestHero: Hero;
	smartestHero: Hero;
	heroCount: number;
	villainCount: number;
}
