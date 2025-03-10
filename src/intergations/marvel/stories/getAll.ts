"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { MarvelStory, MarvelResponse } from "../types";

export const getAllStories = async () => {
  const { MARVEL_API_PUBLIC_KEY, MARVEL_API_PRIVATE_KEY, MARVEL_API_URL } = env;
  const response = await fetch(
    `${MARVEL_API_URL}/v1/public/stories${generateAuthParams(
      MARVEL_API_PUBLIC_KEY || "",
      MARVEL_API_PRIVATE_KEY || ""
    )}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelStory>;
  return data.data.results;
};
