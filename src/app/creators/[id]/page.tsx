import { getCreatorById } from "@/intergations/marvel/creators/service";
import { getCreatorComics } from "@/intergations/marvel/creators/service";
import { getCreatorEvents } from "@/intergations/marvel/creators/service"; 
import { getCreatorSeries } from "@/intergations/marvel/creators/service";
import { getCreatorStories } from "@/intergations/marvel/creators/service";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/carrousel/index.module.css";
import Carousel from "@/components/carrousel";

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const creator = await getCreatorById(parseInt(id));

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="cyber-box p-6 max-w-md">
          <h1 className="text-xl font-mono text-cyan-400 mb-4">DATA.NOT.FOUND</h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
          <p className="text-gray-400 mb-6">Creator data fragment corrupted or missing from the neural database.</p>
          <Link href="/creators" className="px-4 py-2 bg-black/50 border border-cyan-900 text-cyan-400 hover:border-cyan-400 transition-all">
            RETURN.TO.DATABASE
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all related data for this creator
  const [comics, events, series, stories] = await Promise.all([
    getCreatorComics(creator.id),
    getCreatorEvents(creator.id),
    getCreatorSeries(creator.id),
    getCreatorStories(creator.id)
  ]);

  // Transform data for carousels
  const comicItems = comics.map(comic => ({
    title: comic.title,
    url: `/comics/${comic.id}`,
    image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
  }));

  const eventItems = events.map(event => ({
    title: event.title,
    url: `/events/${event.id}`,
    image: `${event.thumbnail.path}.${event.thumbnail.extension}`
  }));

  const seriesItems = series.map(serie => ({
    title: serie.title,
    url: `/series/${serie.id}`,
    image: `${serie.thumbnail.path}.${serie.thumbnail.extension}`
  }));

  // Stories may not have thumbnails
  const storyItems = stories.map(story => ({
    title: story.title,
    url: `/stories/${story.id}`,
    image: story.thumbnail && story.thumbnail.path ? 
      `${story.thumbnail.path}.${story.thumbnail.extension}` : 
      `/api/placeholder/400/600`
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Creator hero section */}
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 z-0"></div>
        <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-0 ${styles.scanline}`}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Creator image with cyberpunk frame */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border border-gray-800">
                <Image
                  src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                  alt={creator.fullName}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-30 ${styles.scanline}`}></div>
                
                {/* Creator ID display */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-900/50">
                  ID:#{creator.id}
                </div>
              </div>
            </div>
            
            {/* Creator info */}
            <div className="max-w-2xl flex-grow">
              {/* Creator name with cyber effect */}
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 mb-1">CREATOR.PROFILE</div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  {creator.fullName}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mt-4"></div>
              </div>
              
              {/* Creator metadata in cyber terminal style */}
              <div className="font-mono text-sm space-y-4">
                {/* Creator statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">COMICS</div>
                    <div className="text-2xl font-bold">{creator.comics?.available || 0}</div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">SERIES</div>
                    <div className="text-2xl font-bold">{creator.series?.available || 0}</div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">EVENTS</div>
                    <div className="text-2xl font-bold">{creator.events?.available || 0}</div>
                  </div>
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="text-xs text-fuchsia-400 mb-2">STORIES</div>
                    <div className="text-2xl font-bold">{creator.stories?.available || 0}</div>
                  </div>
                </div>
                
                {/* Additional creator details */}
                <div className="bg-black/50 border border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                    <span className="text-cyan-400 text-xs">CREATOR.DETAILS</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creator.firstName && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">FIRST.NAME</div>
                        <div className="text-sm text-white">{creator.firstName}</div>
                      </div>
                    )}
                    
                    {creator.lastName && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">LAST.NAME</div>
                        <div className="text-sm text-white">{creator.lastName}</div>
                      </div>
                    )}
                    
                    {creator.middleName && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">MIDDLE.NAME</div>
                        <div className="text-sm text-white">{creator.middleName}</div>
                      </div>
                    )}
                    
                    {creator.suffix && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">SUFFIX</div>
                        <div className="text-sm text-white">{creator.suffix}</div>
                      </div>
                    )}
                    
                    {creator.modified && (
                      <div className="md:col-span-2">
                        <div className="text-xs text-gray-500 mb-1">LAST.MODIFIED</div>
                        <div className="text-sm text-white">
                          {new Date(creator.modified).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* URLs/Resources */}
                {creator.urls && creator.urls.length > 0 && (
                  <div className="bg-black/50 border border-gray-800 p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></div>
                      <span className="text-cyan-400 text-xs">EXTERNAL.RESOURCES</span>
                    </div>
                    <div className="space-y-2">
                      {creator.urls.map((url, index) => (
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
                CREATOR.COMICS
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
        
        {/* Series section */}
        {seriesItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                CREATOR.SERIES
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                SERIES.COUNT:{seriesItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Series" 
              items={seriesItems} 
            />
          </div>
        )}
        
        {/* Events section */}
        {eventItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                CREATOR.EVENTS
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
        
        {/* Stories section */}
        {storyItems.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
                CREATOR.STORIES
              </h2>
              <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                STORIES.COUNT:{storyItems.length}
              </p>
            </div>
            
            <Carousel 
              title="Stories" 
              items={storyItems} 
            />
          </div>
        )}
      </div>
      
      {/* Bottom decorative element */}
      <div className="h-16 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}