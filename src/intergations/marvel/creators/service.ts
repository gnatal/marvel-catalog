"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelCreator, 
  MarvelResponse, 
  MarvelComics, 
  MarvelEvent, 
  MarvelSeries, 
  MarvelStory 
} from "../types";

// Base URL for Marvel API
const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";

/**
 * Fetches a list of all Marvel creators
 */
export const getAllCreators = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

/**
 * Fetches a single creator by ID
 */
export const getCreatorById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/creators/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results[0];
};

/**
 * Fetches comics featuring work by a specific creator
 */
export const getCreatorComics = async (creatorId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/creators/${creatorId}/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

/**
 * Fetches events featuring work by a specific creator
 */
export const getCreatorEvents = async (creatorId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/creators/${creatorId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

/**
 * Fetches series featuring work by a specific creator
 */
export const getCreatorSeries = async (creatorId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/creators/${creatorId}/series${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

/**
 * Fetches stories by a specific creator
 */
export const getCreatorStories = async (creatorId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/creators/${creatorId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Searches for creators by name
 */
export const searchCreators = async (nameStartsWith: string) => {
  const params = new URLSearchParams({ nameStartsWith });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1); // Remove the leading '?'
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/creators${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

/**
 * Filters creators by a specific role (e.g., "penciller", "writer")
 */
export const getCreatorsByRole = async (role: string) => {
  const params = new URLSearchParams({ role });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/creators${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};