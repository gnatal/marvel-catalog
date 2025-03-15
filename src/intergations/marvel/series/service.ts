"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelSeries, 
  MarvelResponse, 
  MarvelCharacter, 
  MarvelComics, 
  MarvelCreator, 
  MarvelEvent, 
  MarvelStory 
} from "../types";

const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";

export const getAllSeries = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/series${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

/**
 * Fetches a single series by ID
 */
export const getSeriesById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results[0];
};

/**
 * Fetches characters appearing in a specific series
 */
export const getSeriesCharacters = async (seriesId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${seriesId}/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

export const getSeriesComics = async (seriesId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${seriesId}/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

export const getSeriesCreators = async (seriesId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${seriesId}/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};


export const getSeriesEvents = async (seriesId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${seriesId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

export const getSeriesStories = async (seriesId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/series/${seriesId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

export const searchSeries = async (titleStartsWith: string) => {
  const params = new URLSearchParams({ titleStartsWith });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/series${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

export const getSeriesByPeriod = async (startYear: number, endYear: number = startYear) => {
  const params = new URLSearchParams({
    startYear: startYear.toString(),
    endYear: endYear.toString()
  });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/series${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

export const getSeriesByType = async (seriesType: string) => {
  const params = new URLSearchParams({ seriesType });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/series${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};