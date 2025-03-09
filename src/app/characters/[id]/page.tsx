import Carousel from "@/components/carrousel";
import { getCharacterComics } from "@/intergations/marvel/characters/comics/getCharcterComicsById";
import { getCharacterById } from "@/intergations/marvel/characters/getById";
import Image from "next/image";
import styles from "@/components/carrousel/index.module.css";
import Link from "next/link";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacterById(parseInt(id));
  const comics = await getCharacterComics(parseInt(id));

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="cyber-box p-6 max-w-md">
          <h1 className="text-xl font-mono text-cyan-400 mb-4">
            DATA.NOT.FOUND
          </h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
          <p className="text-gray-400 mb-6">
            Character data fragment corrupted or missing from the neural
            database.
          </p>
          <Link
            href="/characters"
            className="px-4 py-2 bg-black/50 border border-cyan-900 text-cyan-400 hover:border-cyan-400 transition-all"
          >
            RETURN.TO.DATABASE
          </Link>
        </div>
      </div>
    );
  }

  const formatDescription = (desc: string) => {
    if (!desc) return "No neural profile data available.";
    return desc;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div
          className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-0 ${styles.scanline}`}
        ></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border border-gray-800">
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div
                  className={`absolute inset-0 bg-[url('/scanline.png')] opacity-30 ${styles.scanline}`}
                ></div>

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
                  ID:#{character.id}
                </div>
              </div>
            </div>

            <div className="max-w-2xl flex-grow">
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1">
                  CHARACTER.PROFILE
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  {character.name}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mt-4"></div>
              </div>

              <div className="font-mono text-sm space-y-4">
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                    <span className="text-cyan-400 text-xs">
                      NEURAL.PROFILE
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {formatDescription(character.description)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">
                      COMICS.COUNT
                    </div>
                    <div className="text-2xl font-bold">
                      {character.comics.available}
                    </div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">
                      SERIES.COUNT
                    </div>
                    <div className="text-2xl font-bold">
                      {character.series.available}
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-fuchsia-500 rounded-full mr-2"></div>
                    <span className="text-fuchsia-400 text-xs">
                      SYSTEM.LINKS
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    {character.urls.map((url, index) => (
                      <a
                        key={index}
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
                      >
                        <span className="text-xs text-cyan-500 mr-2">
                          [{url.type.toUpperCase()}]
                        </span>
                        <span>Access {url.type} data</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Carousel
        title="Related comics"
        items={comics.map((comic) => ({
          image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          title: comic.title,
          url: `/comics/${comic.id}`,
        }))}
      />

      <div className="h-16 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
