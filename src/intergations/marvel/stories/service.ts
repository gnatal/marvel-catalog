"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelStory, 
  MarvelResponse, 
  MarvelCharacter, 
  MarvelComics, 
  MarvelCreator, 
  MarvelEvent, 
  MarvelSeries 
} from "../types";

// Base URL for Marvel API
const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";

/**
 * Fetches a list of all Marvel stories
 */
export const getAllStories = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches a single story by ID
 */
export const getStoryById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results[0];
};

/**
 * Fetches characters appearing in a specific story
 */
export const getStoryCharacters = async (storyId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${storyId}/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

/**
 * Fetches comics containing a specific story
 */
export const getStoryComics = async (storyId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${storyId}/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

/**
 * Fetches creators involved in a specific story
 */
export const getStoryCreators = async (storyId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${storyId}/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

/**
 * Fetches events that feature a specific story
 */
export const getStoryEvents = async (storyId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${storyId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

/**
 * Fetches series that contain a specific story
 */
export const getStorySeries = async (storyId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/stories/${storyId}/series${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

/**
 * Fetches stories by a specific type (e.g., "interior story", "cover", "text story")
 */
export const getStoriesByType = async (type: string) => {
  const params = new URLSearchParams({ type });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1); 
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches stories modified after a specific date
 */
export const getStoriesModifiedSince = async (modifiedSince: string) => {
  const params = new URLSearchParams({ modifiedSince });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches stories with optional limit and offset for pagination
 */
export const getStoriesPaginated = async (limit: number = 20, offset: number = 0) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString()
  });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches stories by creator
 */
export const getStoriesByCreator = async (creatorId: number) => {
  const params = new URLSearchParams({ creators: creatorId.toString() });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches stories by character
 */
export const getStoriesByCharacter = async (characterId: number) => {
  const params = new URLSearchParams({ characters: characterId.toString() });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Fetches stories with combined filters
 */
export const getStoriesWithFilters = async (filters: {
  type?: string;
  modifiedSince?: string;
  comics?: number[];
  series?: number[];
  events?: number[];
  creators?: number[];
  characters?: number[];
  orderBy?: string;
  limit?: number;
  offset?: number;
}) => {
  const params = new URLSearchParams();
  
  if (filters.type) params.append('type', filters.type);
  if (filters.modifiedSince) params.append('modifiedSince', filters.modifiedSince);
  if (filters.comics?.length) params.append('comics', filters.comics.join(','));
  if (filters.series?.length) params.append('series', filters.series.join(','));
  if (filters.events?.length) params.append('events', filters.events.join(','));
  if (filters.creators?.length) params.append('creators', filters.creators.join(','));
  if (filters.characters?.length) params.append('characters', filters.characters.join(','));
  if (filters.orderBy) params.append('orderBy', filters.orderBy);
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.offset) params.append('offset', filters.offset.toString());
  
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params.toString()}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/stories${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};