"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelComics, 
  MarvelResponse, 
  MarvelCharacter, 
  MarvelCreator, 
  MarvelEvent, 
  MarvelStory, 
} from "../types";

const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";
export const getAllComics = async (titleStartsWith?: string, limit?: number, offset?: number) => {
  let url = `${API_URL}/v1/public/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`;
  
  if (titleStartsWith) {
    url += `&titleStartsWith=${titleStartsWith}`;
  }

  if (limit) {
    url += `&limit=${limit}`;
  }

  if (offset) {
    url += `&offset=${offset}`;
  }
  
  const response = await fetch(url);
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data;
};

export const getComicById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results[0];
};

export const getComicCharacters = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

export const getComicCreators = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

export const getComicEvents = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

export const getComicStories = async (comicId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/comics/${comicId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

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