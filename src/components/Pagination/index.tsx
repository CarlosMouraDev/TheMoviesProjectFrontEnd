type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='flex justify-center items-center gap-3 mt-6 mb-10 '>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-2 bg-[#1b2233] text-white rounded-md hover:bg-blue-700 disabled:opacity-40 transition'
      >
        ◀ Anterior
      </button>

      <span className='text-white text-sm'>
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-2 bg-[#1b2233] text-white rounded-md hover:bg-blue-700 disabled:opacity-40 transition'
      >
        Próxima ▶
      </button>
    </div>
  );
}
