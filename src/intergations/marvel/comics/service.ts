"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelComics, 
  MarvelResponse, 
  MarvelCharacter, 
  MarvelCreator, 
  MarvelEvent, 
  MarvelStory 
} from "../types";

// Base URL for Marvel API
const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";

/**
 * Fetches a list of all Marvel comics
 */
export const getAllComics = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

/**
 * Fetches a single comic by ID
 */
export const getComicById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results[0];
};

/**
 * Fetches characters appearing in a specific comic
 */
export const getComicCharacters = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

/**
 * Fetches creators of a specific comic
 */
export const getComicCreators = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

/**
 * Fetches events in which a specific comic appears
 */
export const getComicEvents = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

/**
 * Fetches stories contained in a specific comic
 */
export const getComicStories = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Searches for comics by title
 */
export const searchComics = async (titleStartsWith: string) => {
  const params = new URLSearchParams({ titleStartsWith });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1); // Remove the leading '?'
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/comics${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

/**
 * Fetches comics by year
 */
export const getComicsByYear = async (year: number) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  const params = new URLSearchParams({ 
    dateRange: `${startDate},${endDate}` 
  });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/comics${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};