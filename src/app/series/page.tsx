import { getAllSeries } from "@/intergations/marvel/series/getAll";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/carrousel/index.module.css";

export default async function Series() {
  const series = await getAllSeries();
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cyberpunk Header Section */}
      <div className="relative py-16 mb-8">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-fuchsia-900/20 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
            MARVEL SERIES
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-6"></div>
          <p className="text-cyan-400 font-mono tracking-wide max-w-2xl">
            [CONTINUUM.DATABASE] Extended narrative arcs across the multiverse.
            <span className="cyber-pulse">_</span>
          </p>
        </div>
      </div>
      
      {/* Series Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map((serie) => (
            <Link 
              href={`/series/${serie.id}`} 
              key={serie.id} 
              className="group relative bg-gray-900 border border-gray-800 hover:border-cyan-900 transition-all duration-300 rounded overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[2/3] overflow-hidden">
                {/* Image */}
                <Image
                  src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                  alt={serie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity z-10"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 group-hover:opacity-30 transition-opacity z-20 ${styles.scanline}`}></div>
                
                {/* Year range badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50 z-30">
                  {serie.startYear}{serie.endYear !== serie.startYear ? `-${serie.endYear === 2099 ? 'PRESENT' : serie.endYear}` : ''}
                </div>
                
                {/* Rating badge */}
                {serie.rating && serie.rating !== '' && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-fuchsia-400 border border-fuchsia-900/50 z-30">
                    {serie.rating}
                  </div>
                )}
                
                {/* Type indicator */}
                {serie.type && serie.type !== '' && (
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-white border border-gray-700 z-30">
                    {serie.type}
                  </div>
                )}
              </div>
              
              {/* Series Info */}
              <div className="p-4 border-t border-gray-800 group-hover:border-cyan-900/50 transition-colors bg-black">
                <h3 className="text-sm md:text-base font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[2.5rem]">
                  {serie.title}
                </h3>
                
                {/* Cyber line decoration */}
                <div className="h-0.5 w-12 mt-3 bg-gradient-to-r from-fuchsia-500 to-cyan-400 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                
                {/* Series stats */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500 font-mono">COMICS:</span>
                    <span className="text-cyan-500 font-mono">{serie.comics?.available || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500 font-mono">CHARS:</span>
                    <span className="text-fuchsia-500 font-mono">{serie.characters?.available || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Digital glitch layer - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-40 mix-blend-overlay transition-opacity pointer-events-none"></div>
              
              {/* Bottom hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      {/* Floating series indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm border border-cyan-900 text-cyan-400 font-mono text-sm rounded-sm">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-cyan-400 animate-pulse rounded-full"></div>
            <span>SERIES.DATABASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}