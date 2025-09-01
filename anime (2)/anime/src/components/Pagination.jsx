import React from 'react';

const Pagination = ({ currentPage, hasNextPage, onPageChange, loading }) => (
  <div className="pagination">
    <button 
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1 || loading}
      className="pagination-btn"
    >
      Previous
    </button>
    <span className="page-info">Page {currentPage}</span>
    <button 
      onClick={() => onPageChange(currentPage + 1)}
      disabled={!hasNextPage || loading}
      className="pagination-btn"
    >
      Next
    </button>
  </div>
);

export default Pagination;