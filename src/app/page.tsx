import { getAllCharacters } from "@/intergations/marvel/characters/getAll";
import Image from "next/image";

export default async function Home() {
  const characters = await getAllCharacters();

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {characters.map((character) => (
          <div key={character.id}>
            <p>{character.name}</p>
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
