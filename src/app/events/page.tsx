import { getAllEvents } from "@/intergations/marvel/events/getAll";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/carrousel/index.module.css";

export default async function Events() {
  const events = await getAllEvents();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative py-16 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-fuchsia-900/20 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
            MARVEL EVENTS
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-6"></div>
          <p className="text-cyan-400 font-mono tracking-wide max-w-2xl">
            [TIMELINE.DATABASE] Critical nexus points in the multiverse continuum.
            <span className="cyber-pulse">_</span>
          </p>
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {events.map((event) => (
            <Link 
              href={`/events/${event.id}`} 
              key={event.id} 
              className="group relative bg-gray-900 border border-gray-800 hover:border-cyan-900 transition-all duration-300 rounded overflow-hidden flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                {/* Image */}
                <Image
                  src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity z-10"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 group-hover:opacity-30 transition-opacity z-20 ${styles.scanline}`}></div>
                
                {/* Cyber corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-500/0 group-hover:border-cyan-500/80 transition-colors duration-300 z-20"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-fuchsia-500/0 group-hover:border-fuchsia-500/80 transition-colors duration-300 z-20"></div>
                
                {/* Date badge - shows if available */}
                {(event.start || event.end) && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono border border-cyan-900/50 z-30">
                    <span className="text-cyan-400">
                      {formatDate(event.start) || ''} 
                      {(formatDate(event.start) && formatDate(event.end)) ? ' - ' : ''} 
                      {formatDate(event.end) || ''}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Event Info */}
              <div className="p-4 border-t border-gray-800 group-hover:border-cyan-900/50 transition-colors bg-black flex-grow flex flex-col">
                <h3 className="text-sm md:text-base font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[2.5rem]">
                  {event.title}
                </h3>
                
                {/* Cyber line decoration */}
                <div className="h-0.5 w-12 mt-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                
                {/* Event stats */}
                <div className="mt-auto pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <span className="text-gray-500 font-mono mr-1">COMICS:</span>
                    <span className="text-cyan-500 font-mono">{event.comics?.available || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 font-mono mr-1">CHARS:</span>
                    <span className="text-fuchsia-500 font-mono">{event.characters?.available || 0}</span>
                  </div>
                </div>
                
                {/* Timeline connection indicators */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  {event.previous ? (
                    <div className="text-cyan-400 truncate max-w-[45%]">
                      ◀ {event.previous.name}
                    </div>
                  ) : (
                    <div className="text-gray-700">◀ ORIGIN</div>
                  )}
                  
                  {event.next ? (
                    <div className="text-cyan-400 truncate max-w-[45%] text-right">
                      {event.next.name} ▶
                    </div>
                  ) : (
                    <div className="text-gray-700">NEXUS ▶</div>
                  )}
                </div>
              </div>
              
              {/* Bottom highlight */}
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
      
      {/* Floating timeline indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm border border-cyan-900 text-cyan-400 font-mono text-sm rounded-sm">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-cyan-400 animate-pulse rounded-full"></div>
            <span>TIMELINE.MONITOR</span>
          </div>
        </div>
      </div>
    </div>
  );
}