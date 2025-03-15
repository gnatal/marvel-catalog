import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  paginationInfo: {
    offset: number;
    limit: number;
    total: number;
    count: number;
  };
  preserveParams?: { [key: string]: string };
}

const Pagination = ({
  currentPage,
  totalPages,
  baseUrl,
  paginationInfo,
  preserveParams = {}
}: PaginationProps) => {
  // Get page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  // Generate URL with preserved params
  const generateUrl = (page: number) => {
    // Start with the base URL
    let url = `${baseUrl}?page=${page}`;
    
    // Add any preserved params
    const paramEntries = Object.entries(preserveParams);
    if (paramEntries.length > 0) {
      paramEntries.forEach(([key, value], index) => {
        // Skip empty values
        if (!value) return;
        
        // If it's the first param after page, add the & character
        if (index === 0) {
          url += `&${key}=${encodeURIComponent(value)}`;
        } else {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
    }
    
    return url;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12">
      <div className="bg-gray-900 border border-gray-800 p-4 rounded">
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-cyan-400 mr-2"></div>
          <span className="text-cyan-400 font-mono text-sm">
            NAVIGATION.SYSTEM
          </span>
        </div>

        <div className="flex justify-center items-center space-x-2">
          {/* First page button */}
          <Link
            href={generateUrl(1)}
            className={`w-10 h-10 flex items-center justify-center border ${
              currentPage === 1
                ? "border-gray-700 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
            } transition-colors font-mono`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </Link>

          {/* Previous page button */}
          <Link
            href={generateUrl(Math.max(1, currentPage - 1))}
            className={`w-10 h-10 flex items-center justify-center border ${
              currentPage === 1
                ? "border-gray-700 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
            } transition-colors font-mono`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          {/* Page numbers */}
          {pageNumbers.map((pageNum) => (
            <Link
              key={pageNum}
              href={generateUrl(pageNum)}
              className={`w-10 h-10 flex items-center justify-center border ${
                pageNum === currentPage
                  ? "border-cyan-500 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
              } transition-colors font-mono`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </Link>
          ))}

          {/* Next page button */}
          <Link
            href={generateUrl(Math.min(totalPages, currentPage + 1))}
            className={`w-10 h-10 flex items-center justify-center border ${
              currentPage === totalPages
                ? "border-gray-700 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
            } transition-colors font-mono`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Last page button */}
          <Link
            href={generateUrl(totalPages)}
            className={`w-10 h-10 flex items-center justify-center border ${
              currentPage === totalPages
                ? "border-gray-700 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-400 hover:border-cyan-900 hover:text-cyan-400"
            } transition-colors font-mono`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-3 text-center text-xs text-gray-500 font-mono">
          Showing{" "}
          <span className="text-cyan-400">
            {paginationInfo.offset + 1}
          </span>{" "}
          -{" "}
          <span className="text-cyan-400">
            {Math.min(
              paginationInfo.offset + paginationInfo.count,
              paginationInfo.total
            )}
          </span>{" "}
          of{" "}
          <span className="text-cyan-400">{paginationInfo.total}</span>{" "}
          results
        </div>
      </div>
    </div>
  );
};

export default Pagination;