import { getAllComics } from "@/intergations/marvel/comics/getAll";
import Image from "next/image";

export default async function Comics() {
  const comics = await getAllComics();
  console.log(comics);
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {comics.map((comic) => (
          <div key={comic.id}>
            <p>{comic.title}</p>
            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
