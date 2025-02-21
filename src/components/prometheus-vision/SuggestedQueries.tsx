
interface SuggestedQueriesProps {
  queries: string[];
  onSelectQuery: (query: string) => void;
}

const SuggestedQueries = ({ queries, onSelectQuery }: SuggestedQueriesProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
      <p className="text-sm text-gray-500">Try asking about your business metrics</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {queries.map((query, index) => (
          <button
            key={index}
            onClick={() => onSelectQuery(query)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQueries;

