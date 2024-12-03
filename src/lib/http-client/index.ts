import { HttpClient } from './http-client';

export const httpSingleton = new HttpClient({
	baseURL: 'https://pokeapi.co/api/v2/',
	headers: { 'Content-Type': 'application/json' },
});
