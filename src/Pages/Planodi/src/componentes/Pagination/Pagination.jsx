import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import "./Pagination.css";

export default function Pagination({
  numPaginas,
  paginaActual,
  setPaginaActual,
  changePage,
}) {
  const arrayPaginas = [...Array(numPaginas)].map((x, i) => {
    return i + 1;
  });
  const lastPage = numPaginas;
  const nextPage = () => {
    if (paginaActual !== lastPage) {
      setPaginaActual((prevState) => prevState + 1);
      changePage(paginaActual + 1);
    }
  };
  const previousPage = () => {
    if (paginaActual !== 1) {
      setPaginaActual((prevState) => prevState - 1);
      changePage(paginaActual - 1);
    }
  };

  return (
    <div className="wrapper-pagination">
      <div
        className={
          paginaActual === 1
            ? "pagination-arrow-innactive"
            : "pagination-arrow-wrp"
        }
        onClick={previousPage}
      >
        <IoIosArrowBack className="pagination-arrow" />
      </div>
      {arrayPaginas.map((item) =>
        item === 1 ||
        item === lastPage ||
        item === paginaActual ||
        item === paginaActual + 1 ||
        item === paginaActual - 1 ||
        (item === 2 && paginaActual === 4) ||
        (paginaActual === 1 && item === 3) ||
        (paginaActual === 1 && item === 4) ||
        (paginaActual === 1 && item === 5) ||
        (paginaActual === 2 && item === 4) ||
        (paginaActual === 2 && item === 5) ||
        (paginaActual === 3 && item === 5) ||
        (item === lastPage - 1 && paginaActual === lastPage - 3) ||
        (paginaActual === lastPage && item === lastPage - 2) ||
        (paginaActual === lastPage && item === lastPage - 3) ||
        (paginaActual === lastPage && item === lastPage - 4) ||
        (paginaActual === lastPage - 1 && item === lastPage - 3) ||
        (paginaActual === lastPage - 1 && item === lastPage - 4) ||
        (paginaActual === lastPage - 2 && item === lastPage - 4) ||
        (lastPage === 7 && item === 2) ||
        (lastPage === 7 && item === 6) ? (
          <div
            key={item}
            className={
              paginaActual === item
                ? "pagination-number-wrp active"
                : "pagination-number-wrp"
            }
            onClick={() => {
              setPaginaActual(item);
              changePage(item);
            }}
          >
            <p
              className={
                paginaActual === item
                  ? "pagination-number active"
                  : "pagination-number"
              }
            >
              {item}
            </p>
          </div>
        ) : (paginaActual - 1 >= 4 && item === 2) ||
          (lastPage - paginaActual >= 4 && item === lastPage - 1) ? (
          <div key={item} className="pagination-dots-wrp">
            <BiDotsHorizontalRounded className="pagination-number" />
          </div>
        ) : null
      )}
      <div
        className={
          paginaActual === lastPage
            ? "pagination-arrow-innactive"
            : "pagination-arrow-wrp"
        }
        onClick={nextPage}
      >
        <IoIosArrowForward className="pagination-arrow" />
      </div>
    </div>
  );
}
