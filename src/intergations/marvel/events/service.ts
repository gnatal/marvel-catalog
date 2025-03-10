"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { 
  MarvelEvent, 
  MarvelResponse, 
  MarvelCharacter, 
  MarvelComics, 
  MarvelCreator, 
  MarvelSeries, 
  MarvelStory 
} from "../types";

// Base URL for Marvel API
const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";

/**
 * Fetches a list of all Marvel events
 */
export const getAllEvents = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

/**
 * Fetches a single event by ID
 */
export const getEventById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results[0];
};

/**
 * Fetches characters appearing in a specific event
 */
export const getEventCharacters = async (eventId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${eventId}/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

/**
 * Fetches comics that are part of a specific event
 */
export const getEventComics = async (eventId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${eventId}/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};

/**
 * Fetches creators involved in a specific event
 */
export const getEventCreators = async (eventId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${eventId}/creators${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCreator>;
  return data.data.results;
};

/**
 * Fetches series that include a specific event
 */
export const getEventSeries = async (eventId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${eventId}/series${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};

/**
 * Fetches stories that are part of a specific event
 */
export const getEventStories = async (eventId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/events/${eventId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

/**
 * Searches for events by name
 */
export const searchEvents = async (nameStartsWith: string) => {
  const params = new URLSearchParams({ nameStartsWith });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/events${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};

/**
 * Fetches events by time period
 */
export const getEventsByPeriod = async (startYear: number, endYear: number = startYear) => {
  // Format as YYYY-MM-DD for API
  const startDate = `${startYear}-01-01`;
  const endDate = `${endYear}-12-31`;
  
  const params = new URLSearchParams({
    startDate,
    endDate
  });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1);
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/events${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};