import Link from "next/link";
import Image from "next/image";
import { getEventById } from "@/intergations/marvel/events/getById";
import styles from "@/components/carrousel/index.module.css";
import Carousel from "@/components/carrousel";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventData = await getEventById(parseInt(id));
  const event = eventData?.[0];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="cyber-box p-6 max-w-md">
          <h1 className="text-xl font-mono text-cyan-400 mb-4">DATA.NOT.FOUND</h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
          <p className="text-gray-400 mb-6">Event data fragment corrupted or missing from the neural database.</p>
          <Link href="/events" className="px-4 py-2 bg-black/50 border border-cyan-900 text-cyan-400 hover:border-cyan-400 transition-all">
            RETURN.TO.DATABASE
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to format date if available
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Format description
  const formatDescription = (desc: string) => {
    if (!desc) return "No neural profile data available for this multiverse event.";
    return desc;
  };

  // Set up related items for carousels
  const characters = event.characters?.items?.map(character => ({
    title: character.name,
    url: `/characters/${character.resourceURI.split('/').pop()}`,
    image: `/api/placeholder/400/600`
  })) || [];

  const comics = event.comics?.items?.map(comic => ({
    title: comic.name,
    url: `/comics/${comic.resourceURI.split('/').pop()}`,
    image: `/api/placeholder/400/600`
  })) || [];

  const series = event.series?.items?.map(item => ({
    title: item.name,
    url: `/series/${item.resourceURI.split('/').pop()}`,
    image: `/api/placeholder/400/600`
  })) || [];

  const creators = event.creators?.items?.map(creator => ({
    title: `${creator.name} (${creator.role})`,
    url: `/creators/${creator.resourceURI.split('/').pop()}`,
    image: `/api/placeholder/400/600` 
  })) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Event hero section */}
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-0 ${styles.scanline}`}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Event image with cyberpunk frame */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border border-gray-800">
                <Image
                  src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-30 ${styles.scanline}`}></div>
                
                {/* Event ID display */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
                  ID:#{event.id}
                </div>
                
                {/* Date badge */}
                {(event.start || event.end) && (
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-fuchsia-400 border border-fuchsia-900/50">
                    {formatDate(event.start) || ''} 
                    {(formatDate(event.start) && formatDate(event.end)) ? ' - ' : ''} 
                    {formatDate(event.end) || ''}
                  </div>
                )}
              </div>
            </div>
            
            {/* Event info */}
            <div className="max-w-2xl flex-grow">
              {/* Event name with cyber effect */}
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1">EVENT.PROFILE</div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  {event.title}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mt-4"></div>
              </div>
              
              {/* Event description in cyber terminal style */}
              <div className="font-mono text-sm space-y-4">
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                    <span className="text-cyan-400 text-xs">SYNOPSIS</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {formatDescription(event.description)}
                  </p>
                </div>
                
                {/* Event metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">COMICS.COUNT</div>
                    <div className="text-2xl font-bold">{event.comics?.available || 0}</div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">CHARACTERS.COUNT</div>
                    <div className="text-2xl font-bold">{event.characters?.available || 0}</div>
                  </div>
                </div>
                
                {/* Timeline connections */}
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-fuchsia-500 rounded-full mr-2"></div>
                    <span className="text-fuchsia-400 text-xs">TIMELINE.CONNECTIONS</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Previous event */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-mono">PREVIOUS.EVENT:</span>
                      {event.previous ? (
                        <Link 
                          href={`/events/${event.previous.resourceURI.split('/').pop()}`}
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {event.previous.name}
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-600 font-mono">NULL</span>
                      )}
                    </div>
                    
                    {/* Next event */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-mono">NEXT.EVENT:</span>
                      {event.next ? (
                        <Link 
                          href={`/events/${event.next.resourceURI.split('/').pop()}`}
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {event.next.name}
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-600 font-mono">NULL</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* URLs/Resources */}
                {event.urls && event.urls.length > 0 && (
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                      <span className="text-cyan-400 text-xs">EXTERNAL.RESOURCES</span>
                    </div>
                    <div className="space-y-2">
                      {event.urls.map((url, index) => (
                        <a 
                          key={index}
                          href={url.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
                        >
                          <span className="text-xs text-cyan-500 mr-2">[{url.type.toUpperCase()}]</span>
                          <span>Access {url.type} data</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related content sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Characters section */}
        {characters.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                FEATURED.CHARACTERS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                KEY.ENTITIES:{characters.length}
              </p>
            </div>
            
            <Carousel 
              title="Characters" 
              items={characters} 
            />
          </div>
        )}
        
        {/* Comics section */}
        {comics.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                RELATED.COMICS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                ISSUES.COUNT:{comics.length}
              </p>
            </div>
            
            <Carousel 
              title="Comics" 
              items={comics} 
            />
          </div>
        )}
        
        {/* Series section */}
        {series.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                RELATED.SERIES
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                SERIES.COUNT:{series.length}
              </p>
            </div>
            
            <Carousel 
              title="Series" 
              items={series} 
            />
          </div>
        )}
        
        {/* Creators section */}
        {creators.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                CONTENT.ARCHITECTS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                CREATORS.COUNT:{creators.length}
              </p>
            </div>
            
            <Carousel 
              title="Creators" 
              items={creators} 
            />
          </div>
        )}
      </div>
      
      {/* Bottom decorative element */}
      <div className="h-16 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}