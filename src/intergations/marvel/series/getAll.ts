"use server";
import { env } from "@/config/loadenv";
import { generateAuthParams } from "../authentication";
import { MarvelResponse, MarvelSeries } from "../types";

export const getAllSeries = async () => {
  const { MARVEL_API_PUBLIC_KEY, MARVEL_API_PRIVATE_KEY, MARVEL_API_URL } = env;
  const response = await fetch(
    `${MARVEL_API_URL}/v1/public/series${generateAuthParams(
      MARVEL_API_PUBLIC_KEY || "",
      MARVEL_API_PRIVATE_KEY || ""
    )}`
  );
  const data = (await response.json()) as MarvelResponse<MarvelSeries>;
  return data.data.results;
};
