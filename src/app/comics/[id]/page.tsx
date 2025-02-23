import { getComicsById } from "@/intergations/marvel/comics/getById";
import Image from "next/image";

export default async function ComicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comic = await getComicsById(parseInt(id));

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl">{comic.title}</h1>
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        width={200}
        height={200}
      />
      {/* <Carousel
        title="Related comics"
        items={comics.map((comic) => ({
          image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          title: comic.title,
          url: `/comics/${comic.id}`,
        }))}
      /> */}
    </div>
  );
}
