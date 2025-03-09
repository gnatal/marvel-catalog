import { getAllCharacters } from "@/intergations/marvel/characters/getAll";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/carrousel/index.module.css";

export default async function Characters() {
  const characters = await getAllCharacters();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative py-16 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-fuchsia-900/20 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5 z-0"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
            MARVEL CHARACTERS
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-6"></div>
          <p className="text-cyan-400 font-mono tracking-wide max-w-2xl">
            [IDENTITY.DATABASE] Access profiles of entities across the Marvel multiverse.
            <span className="cyber-pulse">_</span>
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {characters.map((character) => (
            <Link 
              href={`/characters/${character.id}`} 
              key={character.id} 
              className="group relative bg-gray-900 border border-gray-800 hover:border-cyan-900 transition-all duration-300 rounded overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity z-10"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 group-hover:opacity-30 transition-opacity z-20 ${styles.scanline}`}></div>
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-500/10 mix-blend-overlay z-10 transition-opacity"></div>
                
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-500/0 group-hover:border-cyan-500/80 transition-colors duration-300 z-20"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-fuchsia-500/0 group-hover:border-fuchsia-500/80 transition-colors duration-300 z-20"></div>
              </div>
              
              <div className="p-4 border-t border-gray-800 group-hover:border-cyan-900/50 transition-colors bg-black">
                <h3 className="text-sm md:text-base font-medium text-white group-hover:text-cyan-400 transition-colors truncate">
                  {character.name}
                </h3>
                
                <div className="h-0.5 w-12 mt-3 bg-gradient-to-r from-fuchsia-500 to-cyan-400 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 font-mono">ID:</span>
                    <span className="text-xs text-cyan-500 font-mono">#{character.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 font-mono">COMICS:</span>
                    <span className="text-xs text-fuchsia-500 font-mono">{character.comics?.available || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm border border-cyan-900 text-cyan-400 font-mono text-sm rounded-sm">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-cyan-400 animate-pulse rounded-full"></div>
            <span>CHARACTERS.DATABASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}