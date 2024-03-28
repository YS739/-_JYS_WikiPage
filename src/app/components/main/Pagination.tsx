/**
 * @description 한 번에 5개의 위키 제목을 보여주는 pagination 컴포넌트
 */

interface pagiNationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getPageNumbers: () => number[];
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  getPageNumbers,
}: pagiNationProps) => {
  return (
    <div className="flex justify-center my-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`text-primary font-semibold text-2xl py-2 px-4 rounded-lg mx-1 ${
          currentPage <= 1 && "text-opacity-40"
        }`}
      >
        &lt;
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`${
            pageNumber === currentPage
              ? "bg-accent text-lightBase"
              : "bg-secondary hover:bg-accent text-primary hover:text-lightBase transition-colors duration-300"
          } font-semibold py-2 px-4 rounded-lg mx-1`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`text-primary font-semibold text-2xl py-2 px-4 rounded-lg mx-1 ${
          currentPage >= totalPages && "text-opacity-40"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
