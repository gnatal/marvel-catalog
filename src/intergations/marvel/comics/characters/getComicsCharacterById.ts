"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../../authentication";
import { MarvelCharacter, MarvelResponse } from "../../types";

export const getComicsCharacters = async (id:number) => {
  const { MARVEL_API_PUBLIC_KEY, MARVEL_API_PRIVATE_KEY, MARVEL_API_URL } = env;
  const response = await fetch(
    `${MARVEL_API_URL}/v1/public/comics/${id}/characters${generateAuthParams(
      MARVEL_API_PUBLIC_KEY || "",
      MARVEL_API_PRIVATE_KEY || ""
    )}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelCharacter>;
  return data.data.results;
};
