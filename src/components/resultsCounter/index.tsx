interface ResultsCounterProps {
    count: number;
    total?: number;
    filterLabel?: string;
    filterValue?: string;
  }
  
  const ResultsCounter = ({ 
    count, 
    total, 
    filterLabel, 
    filterValue 
  }: ResultsCounterProps) => {
    return (
      <div className="text-gray-400 font-mono text-sm flex justify-between items-center">
        <div>
          <span className="text-cyan-400">{total || count}</span> results found
          {filterValue && (
            <span>
              {" "}
              {filterLabel || "filtered by"}{" "}
              <span className="text-fuchsia-500">{filterValue}</span>
            </span>
          )}
        </div>
      </div>
    );
  };
  
  export default ResultsCounter;