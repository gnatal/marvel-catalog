import { getSeriesById } from "@/intergations/marvel/series/service";
import { getSeriesCharacters } from "@/intergations/marvel/series/service";
import { getSeriesComics } from "@/intergations/marvel/series/service";
import { getSeriesCreators } from "@/intergations/marvel/series/service";
import { getSeriesEvents } from "@/intergations/marvel/series/service";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/carrousel/index.module.css";
import Carousel from "@/components/carrousel";

export default async function SeriePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeriesById(parseInt(id));

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="cyber-box p-6 max-w-md">
          <h1 className="text-xl font-mono text-cyan-400 mb-4">DATA.NOT.FOUND</h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
          <p className="text-gray-400 mb-6">Series data fragment corrupted or missing from the neural database.</p>
          <Link href="/series" className="px-4 py-2 bg-black/50 border border-cyan-900 text-cyan-400 hover:border-cyan-400 transition-all">
            RETURN.TO.DATABASE
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all related data for this series
  const [characters, comics, creators, events] = await Promise.all([
    getSeriesCharacters(series.id),
    getSeriesComics(series.id),
    getSeriesCreators(series.id),
    getSeriesEvents(series.id)
  ]);

  // Format series description
  const formatDescription = (desc: string) => {
    if (!desc) return "No data available for this series.";
    return desc;
  };

  // Transform data for carousels
  const characterItems = characters.map(character => ({
    title: character.name,
    url: `/characters/${character.id}`,
    image: `${character.thumbnail.path}.${character.thumbnail.extension}`
  }));

  const comicItems = comics.map(comic => ({
    title: comic.title,
    url: `/comics/${comic.id}`,
    image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
  }));

  // Note: Creators don't have a 'role' field in the API response from getSeriesCreators
  // Instead, we'll just show their name without role
  const creatorItems = creators.map(creator => ({
    title: creator.fullName,
    url: `/creators/${creator.id}`,
    image: `${creator.thumbnail.path}.${creator.thumbnail.extension}`
  }));

  const eventItems = events.map(event => ({
    title: event.title,
    url: `/events/${event.id}`,
    image: `${event.thumbnail.path}.${event.thumbnail.extension}`
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Series hero section */}
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-0 ${styles.scanline}`}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Series cover with cyberpunk frame */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-96 md:w-80 md:h-120 overflow-hidden border border-gray-800">
                <Image
                  src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                  alt={series.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-30 ${styles.scanline}`}></div>
                
                {/* Series ID display */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
                  ID:#{series.id}
                </div>
                
                {/* Year range badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-fuchsia-400 border border-fuchsia-900/50">
                  {series.startYear}{series.endYear !== series.startYear ? `-${series.endYear === 2099 ? 'PRESENT' : series.endYear}` : ''}
                </div>
              </div>
            </div>
            
            {/* Series info */}
            <div className="max-w-2xl flex-grow">
              {/* Series title with cyber effect */}
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1">SERIES.PROFILE</div>
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  {series.title}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mt-4"></div>
              </div>
              
              {/* Series description in cyber terminal style */}
              <div className="font-mono text-sm space-y-4">
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                    <span className="text-cyan-400 text-xs">SYNOPSIS</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {formatDescription(series?.description || "")}
                  </p>
                </div>
                
                {/* Series metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">COMICS.COUNT</div>
                    <div className="text-2xl font-bold">{series.comics?.available || 0}</div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">CHARACTERS.COUNT</div>
                    <div className="text-2xl font-bold">{series.characters?.available || 0}</div>
                  </div>
                </div>
                
                {/* Series details */}
                <div className="bg-black/50 border border-gray-800 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {series.startYear && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">START.YEAR</div>
                      <div className="text-sm">{series.startYear}</div>
                    </div>
                  )}
                  
                  {series.endYear && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">END.YEAR</div>
                      <div className="text-sm">{series.endYear === 2099 ? 'PRESENT' : series.endYear}</div>
                    </div>
                  )}
                  
                  {series.rating && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">RATING</div>
                      <div className="text-sm">{series.rating}</div>
                    </div>
                  )}
                  
                  {series.type && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">TYPE</div>
                      <div className="text-sm">{series.type}</div>
                    </div>
                  )}
                </div>
                
                {/* URLs/Resources */}
                {series.urls && series.urls.length > 0 && (
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                      <span className="text-cyan-400 text-xs">EXTERNAL.RESOURCES</span>
                    </div>
                    <div className="space-y-2">
                      {series.urls.map((url, index) => (
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
        {/* Comics section */}
        {comicItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                SERIES.ISSUES
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                COMICS.COUNT:{comicItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Comics" 
              items={comicItems} 
            />
          </div>
        )}
        
        {/* Characters section */}
        {characterItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                FEATURED.CHARACTERS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                CHARACTER.COUNT:{characterItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Characters" 
              items={characterItems} 
            />
          </div>
        )}
        
        {/* Creators section */}
        {creatorItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                CONTENT.ARCHITECTS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                CREATORS.COUNT:{creatorItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Creators" 
              items={creatorItems} 
            />
          </div>
        )}
        
        {/* Events section */}
        {eventItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                RELATED.EVENTS
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                EVENTS.COUNT:{eventItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Events" 
              items={eventItems} 
            />
          </div>
        )}
      </div>
      
      {/* Bottom decorative element */}
      <div className="h-16 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}