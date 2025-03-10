import Carousel from "@/components/carrousel";
import { getAllCharacters } from "@/intergations/marvel/characters/service";
import { getAllComics } from "@/intergations/marvel/comics/service";
import { getAllEvents } from "@/intergations/marvel/events/service";
import { getAllSeries } from "@/intergations/marvel/series/getAll";
import Link from "next/link";

export default async function Home() {
  const characters = await getAllCharacters();
  const comics = await getAllComics();
  const events = await getAllEvents();
  const series = await getAllSeries();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/50 via-black to-black"></div>
        
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20"></div>
        
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-cyan-400 text-center mb-4">
            MARVEL
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 mb-6 text-center font-mono tracking-wider">
            [NEURAL.CATALOG.v2.0]
          </p>
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mb-6"></div>
          <div className="flex gap-4">
            <Link 
              href="/characters" 
              className="px-6 py-2 bg-black border border-cyan-500 text-cyan-400 hover:bg-cyan-900/20 hover:text-white transition-all duration-300 font-mono tracking-wider"
            >
              EXPLORE
            </Link>
            <Link 
              href="/comics" 
              className="px-6 py-2 bg-fuchsia-900/30 border border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-900/50 hover:text-white transition-all duration-300 font-mono tracking-wider"
            >
              COMICS
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
                MARVEL CATALOG
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Comics", "Series", "Creators", "Events", "Stories", "Characters"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-mono tracking-wide"
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="space-y-2">
        <Carousel
          items={characters.map((character) => {
            return {
              image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
              title: character.name,
              url: `/characters/${character.id}`,
            }
          })}
          title="CHARACTERS"
        />
        
        <Carousel
          items={comics.map((comic) => {
            return {
              image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
              title: comic.title,
              url: `/comics/${comic.id}`,
            }
          })}
          title="COMICS"
        />
        
        <Carousel
          items={events.map((event) => {
            return {
              image: `${event.thumbnail.path}.${event.thumbnail.extension}`,
              title: event.title,
              url: `/events/${event.id}`,
            }
          })}
          title="EVENTS"
        />
        
        <Carousel
          items={series.map((serie) => {
            return {
              image: `${serie.thumbnail.path}.${serie.thumbnail.extension}`,
              title: serie.title,
              url: `/series/${serie.id}`,
            }
          })}
          title="SERIES"
        />
      </div>
      
      <footer className="mt-16 bg-gray-900 border-t border-fuchsia-900">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wider">MARVEL [NEURAL.CATALOG]</h3>
              <p className="text-gray-400 text-sm">Accessing the digital nexus of Marvels vast multiverse. Data streams directly from the quantum core.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-fuchsia-400 mb-4 font-mono tracking-wider">NAVIGATE</h3>
              <ul className="space-y-2">
                {["Characters", "Comics", "Series", "Events"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono tracking-wider">SYSTEM.INFO</h3>
              <p className="text-gray-400 text-sm">Data provided by Marvel. © 2025 MARVEL</p>
              <p className="text-gray-400 text-sm mt-2">Cyberpunk Interface v2.0.4</p>
              <div className="h-1 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mt-4"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}