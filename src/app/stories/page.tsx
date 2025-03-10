import { getAllStories } from "@/intergations/marvel/stories/getAll";

export default async function Stories() {
  const stories = await getAllStories();
  
  // Helper function to get a story type icon
  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'cover': return '◈';
      case 'interior story': return '◉';
      case 'promo': return '◆';
      case 'text story': return '◎';
      case 'backcovers': return '▣';
      case 'credits': return '⧩';
      default: return '◇';
    }
  };
  
  // Helper function to get truncated description
  const getTruncatedDescription = (description: string) => {
    if (!description) return "No data available.";
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };
  
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
            MARVEL STORIES
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-6"></div>
          <p className="text-cyan-400 font-mono tracking-wide max-w-2xl">
            [NARRATIVE.DATABASE] Digital fragments of the Marvel storytelling matrix.
            <span className="cyber-pulse">_</span>
          </p>
        </div>
      </div>
      
      {/* Stories Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="group relative bg-gray-900 border border-gray-800 hover:border-cyan-900 transition-all duration-300 rounded overflow-hidden"
            >
              {/* Story Content */}
              <div className="p-5 bg-black">
                {/* Title with type icon */}
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-900 border border-gray-800 text-cyan-400 mr-3 font-mono">
                    {getTypeIcon(story.type)}
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {story.title || "Untitled Story"}
                  </h3>
                </div>
                
                {/* Cyber line decoration */}
                <div className="h-0.5 w-12 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mb-4"></div>
                
                {/* Story description */}
                <div className="font-mono text-xs text-gray-400 mb-5 min-h-[3rem]">
                  {getTruncatedDescription(story.description)}
                </div>
                
                {/* Story metadata */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 font-mono mr-1">TYPE:</span>
                    <span className="text-xs text-cyan-500 font-mono truncate">{story.type || "Unknown"}</span>
                  </div>
                  
                  {story.originalIssue && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 font-mono mr-1">ISSUE:</span>
                      <span className="text-xs text-fuchsia-500 font-mono truncate">{story.originalIssue.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 font-mono mr-1">CHARS:</span>
                    <span className="text-xs text-cyan-500 font-mono">{story.characters?.available || 0}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 font-mono mr-1">CREATORS:</span>
                    <span className="text-xs text-fuchsia-500 font-mono">{story.creators?.available || 0}</span>
                  </div>
                </div>
                
                {/* Story ID and hash visualization */}
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-900">
                  <div className="text-xs font-mono text-gray-600">ID:#{story.id}</div>
                  
                  {/* Visual hash pattern unique to each story */}
                  <div className="flex space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      // Generate a psuedo-random pattern based on story ID
                      const isActive = (story.id % (i + 3)) % 2 === 0;
                      return (
                        <div 
                          key={i} 
                          className={`w-1 h-3 ${isActive ? 'bg-cyan-500' : 'bg-gray-800'}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Hover effects */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      {/* Floating database indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm border border-cyan-900 text-cyan-400 font-mono text-sm rounded-sm">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-cyan-400 animate-pulse rounded-full"></div>
            <span>NARRATIVE.DATABASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}