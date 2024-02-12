import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={10}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName={'pagination flex justify-center item-center my-5'}
      activeClassName={'active bg-gradient-to-tl from-paginationp to-paginations text-whitet'}
      pageClassName={'page-item px-2  rounded font-semibold hover:text-ohover duration-300'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link px-2 font-semibold hover:text-whitet py-1 mr-2 rounded-lg hover:bg-gradient-to-tl from-btnviewh to-paginationp duration-300'}
      nextClassName={'page-item '}
      nextLinkClassName={'page-link px-2 font-semibold hover:text-whitet py-1 ml-2 rounded-lg hover:bg-gradient-to-tl from-btnviewh to-paginationp duration-300'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
    />
  );
};

export default Pagination;
