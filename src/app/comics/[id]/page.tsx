import Image from "next/image";
import styles from "@/components/carrousel/index.module.css";
import Carousel from "@/components/carrousel";
import Link from "next/link";
import { getComicById } from "@/intergations/marvel/comics/service";
import { getComicCharacters } from "@/intergations/marvel/comics/service";
import { getComicCreators } from "@/intergations/marvel/comics/service";
import { getComicEvents } from "@/intergations/marvel/comics/service";

export default async function ComicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comic = await getComicById(parseInt(id));

  if (!comic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="cyber-box p-6 max-w-md">
          <h1 className="text-xl font-mono text-cyan-400 mb-4">DATA.NOT.FOUND</h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
          <p className="text-gray-400 mb-6">Comic data fragment corrupted or missing from the neural database.</p>
          <Link href="/comics" className="px-4 py-2 bg-black/50 border border-cyan-900 text-cyan-400 hover:border-cyan-400 transition-all">
            RETURN.TO.DATABASE
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all related data for this comic
  const [characters, creators, events] = await Promise.all([
    getComicCharacters(comic.id),
    getComicCreators(comic.id),
    getComicEvents(comic.id)
  ]);

  // Format comic description
  const formatDescription = (desc: string) => {
    if (!desc) return "No data available for this publication.";
    return desc;
  };

  // Transform data for carousels
  const characterItems = characters.map(character => ({
    title: character.name,
    url: `/characters/${character.id}`,
    image: `${character.thumbnail.path}.${character.thumbnail.extension}`
  }));

  const creatorItems = creators.map(creator => ({
    title: `${creator.fullName} ("Creator"})`,
    url: `/creators/${creator.id}`,
    image: `${creator.thumbnail.path}.${creator.thumbnail.extension}`
  }));

  const eventItems = events.map(event => ({
    title: event.title,
    url: `/events/${event.id}`,
    image: `${event.thumbnail.path}.${event.thumbnail.extension}`
  }));

  // Series data is directly from comic object since there's no getComicSeries endpoint
  const seriesItems = comic.series ? [{
    title: comic.series.name,
    url: `/series/${comic.series.resourceURI.split('/').pop()}`,
    image: `/api/placeholder/400/600` // Placeholder since we don't have series image
  }] : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Comic hero section */}
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-0 ${styles.scanline}`}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Comic cover with cyberpunk frame */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-96 md:w-80 md:h-120 overflow-hidden border border-gray-800">
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-30 ${styles.scanline}`}></div>
                
                {/* Comic ID display */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
                  ID:#{comic.id}
                </div>
                
                {/* Comic price/format */}
                {comic.prices && comic.prices.length > 0 && (
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-fuchsia-400 border border-fuchsia-900/50">
                    ${comic.prices[0].price}
                  </div>
                )}
              </div>
            </div>
            
            {/* Comic info */}
            <div className="max-w-2xl flex-grow">
              {/* Comic title with cyber effect */}
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1">PUBLICATION.DATA</div>
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  {comic.title}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mt-4"></div>
              </div>
              
              {/* Comic description in cyber terminal style */}
              <div className="font-mono text-sm space-y-4">
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                    <span className="text-cyan-400 text-xs">SYNOPSIS</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {formatDescription(comic?.description || "")}
                  </p>
                </div>
                
                {/* Comic metadata */}
                <div className="grid grid-cols-2 gap-4">
                  {comic.pageCount > 0 && (
                    <div className="bg-black/50 border border-gray-800 p-4">
                      <div className="text-xs text-fuchsia-400 mb-2">PAGE.COUNT</div>
                      <div className="text-2xl font-bold">{comic.pageCount}</div>
                    </div>
                  )}
                  {comic.format && (
                    <div className="bg-black/50 border border-gray-800 p-4">
                      <div className="text-xs text-fuchsia-400 mb-2">FORMAT</div>
                      <div className="text-lg font-bold">{comic.format}</div>
                    </div>
                  )}
                </div>
                
                {/* Publication details */}
                <div className="bg-black/50 border border-gray-800 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comic.dates && comic.dates.map((date, index) => {
                    if (date.type === 'onsaleDate' || date.type === 'focDate') {
                      const dateObj = new Date(date.date);
                      const formattedDate = dateObj.toLocaleDateString();
                      return (
                        <div key={index}>
                          <div className="text-xs text-cyan-400 mb-1">
                            {date.type === 'onsaleDate' ? 'RELEASE.DATE' : 'FOC.DATE'}
                          </div>
                          <div className="text-sm">{formattedDate}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  {/* Creators section - inline summary */}
                  {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
                    <div className="md:col-span-2 mt-2">
                      <div className="text-xs text-cyan-400 mb-2">CREATOR.DATA</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1">
                        {comic.creators.items.map((creator, index) => (
                          <div key={index} className="text-sm flex items-center">
                            <span className="text-xs text-fuchsia-400 mr-2">[{creator.role}]</span>
                            <span className="text-gray-300">{creator?.name || ""}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Diamond code and UPC if available */}
                  {comic.diamondCode && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">DIAMOND.CODE</div>
                      <div className="text-sm font-mono">{comic.diamondCode}</div>
                    </div>
                  )}
                  
                  {comic.upc && (
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">UPC.CODE</div>
                      <div className="text-sm font-mono">{comic.upc}</div>
                    </div>
                  )}
                </div>
                
                {/* URLs/Resources */}
                {comic.urls && comic.urls.length > 0 && (
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                      <span className="text-cyan-400 text-xs">EXTERNAL.RESOURCES</span>
                    </div>
                    <div className="space-y-2">
                      {comic.urls.map((url, index) => (
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
        
        {/* Series section */}
        {seriesItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                PARENT.SERIES
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                SERIES.DATA
              </p>
            </div>
            
            <Carousel 
              title="Series" 
              items={seriesItems} 
            />
          </div>
        )}
      </div>
      
      {/* Bottom decorative element */}
      <div className="h-16 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}