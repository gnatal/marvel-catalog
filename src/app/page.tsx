import Carousel from "@/components/carrousel";
import { getAllCharacters } from "@/intergations/marvel/characters/getAll";

export default async function Home() {
  const characters = await getAllCharacters();

  return (
    <div className="h-screen w-screen overflow-hidden ">
      <Carousel
        items={characters.map((character) => {
          return {
            image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            title: character.name,
            url: `/characters/${character.id}`,
          }
        })}
        title="Characters"
      />
    </div>
  );
}
