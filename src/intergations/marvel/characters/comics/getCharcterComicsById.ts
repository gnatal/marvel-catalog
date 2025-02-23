"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../../authentication";
import { MarvelComics, MarvelResponse } from "../../types";

export const getCharacterComics = async (id:number) => {
  const { MARVEL_API_PUBLIC_KEY, MARVEL_API_PRIVATE_KEY, MARVEL_API_URL } = env;
  const response = await fetch(
    `${MARVEL_API_URL}/v1/public/characters/${id}/comics${generateAuthParams(
      MARVEL_API_PUBLIC_KEY || "",
      MARVEL_API_PRIVATE_KEY || ""
    )}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelComics>;
  return data.data.results;
};
