import Link from "next/link";

interface AlphabetFilterProps {
  currentFilter: string;
  baseUrl: string;
  preserveParams?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AlphabetFilter = ({ 
  currentFilter, 
  baseUrl, 
  preserveParams = {}, 
  searchParams = {}
}: AlphabetFilterProps) => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const generateUrl = (letter?: string) => {
    const queryParams: { [key: string]: string } = {};
    
    if (searchParams) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(preserveParams).forEach(([paramName, _]) => {
        if (searchParams[paramName]) {
          const value = searchParams[paramName];
          queryParams[paramName] = Array.isArray(value) ? value[0] : value as string;
        }
      });
    }
    
    if (letter) {
      queryParams.letter = letter;
    }
    
    const queryString = Object.entries(queryParams)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded">
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 bg-cyan-400 mr-2"></div>
        <span className="text-cyan-400 font-mono text-sm">
          FILTER.BY.INITIAL
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={generateUrl()}
          className={`w-8 h-8 flex items-center justify-center border ${
            !currentFilter
              ? "border-cyan-500 text-cyan-400"
              : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
          } transition-colors font-mono text-sm`}
        >
          ALL
        </Link>

        {alphabet.map((letter) => (
          <Link
            key={letter}
            href={generateUrl(letter)}
            className={`w-8 h-8 flex items-center justify-center border ${
              currentFilter === letter
                ? "border-cyan-500 text-cyan-400"
                : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
            } transition-colors font-mono`}
          >
            {letter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlphabetFilter;