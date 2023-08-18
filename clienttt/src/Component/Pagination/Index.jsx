import React, { useState } from "react";
import "../Css/pagination.css";

const Pagination = ({
  currentpage,
  totalCount,
  visiblePageCount,
  getAllData,
}) => {
  const [currentPage, setCurrentPage] = useState(currentpage || 1);

  const calculatePageRange = () => {
    const pageRange = [];
    let startPage = Math.max(1, currentpage - Math.floor(visiblePageCount / 2));
    let endPage = Math.min(totalCount, startPage + visiblePageCount - 1);

    if (endPage - startPage + 1 < visiblePageCount) {
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }
    return pageRange;
  };

  const pageRange = calculatePageRange();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAllData(pageNumber);
  };

  return (
    <>
      <div className="pagination">
        <div className="">
          {currentpage} out of {totalCount} Pages
        </div>
        <div className="pageNo_btn">
          {currentPage > 1 && (
            <button
              className="btn mr-1"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {/* {/ Render page buttons /} */}
          {pageRange.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn pagination_btn ${pageNumber === currentPage ? "activePage " : ""}`}  >
              {pageNumber}
            </button>
          ))}

          {/* {/ Render next button /} */}
          {currentPage < totalCount && (
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
