"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { MarvelCharacter, MarvelResponse, MarvelComics, MarvelEvent, MarvelSeries, MarvelStory } from "../types";

const API_URL = env.MARVEL_API_URL;
const PUBLIC_KEY = env.MARVEL_API_PUBLIC_KEY || "";
const PRIVATE_KEY = env.MARVEL_API_PRIVATE_KEY || "";


export const getAllCharacters = async () => {
  const response = await fetch(
    `${API_URL}/v1/public/characters${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};

export const getCharacterById = async (id: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/characters/${id}${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results[0];
};

export const getCharacterComics = async (characterId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/characters/${characterId}/comics${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};


export const getCharacterEvents = async (characterId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/characters/${characterId}/events${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelEvent>;
  return data.data.results;
};


export const getCharacterSeries = async (characterId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/characters/${characterId}/series${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};
export const getCharacterStories = async (characterId: number) => {
  const response = await fetch(
    `${API_URL}/v1/public/characters/${characterId}/stories${generateAuthParams(PUBLIC_KEY, PRIVATE_KEY)}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};

export const searchCharacters = async (nameStartsWith: string) => {
  const params = new URLSearchParams({ nameStartsWith });
  const authParams = generateAuthParams(PUBLIC_KEY, PRIVATE_KEY).substring(1); // Remove the leading '?'
  const fullParams = `?${params}&${authParams}`;
  
  const response = await fetch(
    `${API_URL}/v1/public/characters${fullParams}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};