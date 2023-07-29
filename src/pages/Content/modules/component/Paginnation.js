import React, { useState } from 'react';

import '@/style/Pagination.scss';

const Pagination = ({ itemsPerPage, currentPage, totalItems, paginate }) => {
  const [activePage, setActivePage] = useState(currentPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.floor(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setActivePage(number);
    paginate(number);
  };

  const handlePreviousClick = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
      paginate(activePage - 1);
    }
  };

  const handleNextClick = () => {
    if (activePage < pageNumbers.length) {
      setActivePage(activePage + 1);
      paginate(activePage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {/* <li>{currentPage * itemsPerPage + "/" + totalItems}</li> */}
        <li>{currentPage + 1 + '/' + (pageNumbers.length + 1)}</li>
        <li className={`page-item ${activePage === 0 ? 'disabled' : ''}`}>
          <span
            onClick={handlePreviousClick}
            href="!#"
            className="page-link"
            tabIndex="-1"
            aria-disabled={activePage === 1}
          >
            上一页
          </span>
        </li>
        {/* {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${activePage === number ? 'active' : ''}`}
          >
            <a onClick={() => handleClick(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))} */}
        <li
          className={`page-item ${activePage === pageNumbers.length ? 'disabled' : ''
            }`}
        >
          <span
            onClick={handleNextClick}
            href="!#"
            className="page-link"
            aria-disabled={activePage === pageNumbers.length - 1}
          >
            下一页
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
