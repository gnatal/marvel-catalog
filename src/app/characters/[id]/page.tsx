import Carousel from "@/components/carrousel";
import { getCharacterComics } from "@/intergations/marvel/characters/comics/getCharcterComicsById";
import { getCharacterById } from "@/intergations/marvel/characters/getById";
import Image from "next/image";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacterById(parseInt(id));
  const comics = await getCharacterComics(parseInt(id));


  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl">{character.name}</h1>
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={200}
        height={200}
      />
      <Carousel title="Related comics" items={comics.map((comic) => ({
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        title: comic.title,
        url: `/comics/${comic.id}`,
      }))} />
    </div>
  );
}
