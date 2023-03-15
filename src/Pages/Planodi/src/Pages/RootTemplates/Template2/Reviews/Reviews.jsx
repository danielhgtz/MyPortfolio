import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import "./Reviews.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";
import ModalNewReview from "./ModalNewReview/ModalNewReview";
import { useAuthModals } from "../../../HomePage/Navbar/Navbar";
import ModalRegistro from "../../../HomePage/Navbar/ModalRegistro/ModalRegistro";
import ModalLogin from "../../../HomePage/Navbar/ModalLogin/ModalLogin";
import { toast } from "react-toastify";

// const resenas = [
//   {
//     name: "Esteban Pérez",
//     score: 5,
//     dateCreated: "5 NOV 21",
//     comment:
//       "et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique",
//   },
//   {
//     name: "Luis Ortiz",
//     score: 4,
//     dateCreated: "22 JUL 21",
//     comment:
//       "et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique",
//   },
//   {
//     name: "Fernando Amezcua",
//     score: 4,
//     dateCreated: "15 ENE 22",
//     comment:
//       "et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique et, fugiat labore minus natus officiis quibusdam quo similique",
//   },
// ];

const useStyles = makeStyles(() => ({
  buttonReview: {
    borderRadius: "8px",
    padding: "8px 50px",
    border: "solid #3b3b3b 1px",
    backgroundColor: "#FFFFFF",
    color: "#3b3b3b",
    "&:hover": {
      backgroundColor: "#3b3b3b",
      color: "#FFFFFF",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function Reviews({
  idAliado,
  stateUser,
  avgScore,
  reviews,
  reviewsPerPage,
  setReloadInfo,
}) {
  const mobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();

  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [activeReviews, setActiveReviews] = useState([]);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();

  const onClickRight = () => {
    setLoadingMoreComments(true);
    setActiveReviews(
      reviews.slice(
        currentPage * reviewsPerPage,
        currentPage * reviewsPerPage + reviewsPerPage
      )
    );
    setCurrentPage(currentPage + 1);
    setTimeout(() => {
      setLoadingMoreComments(false);
    }, 300);
  };

  const onClickLeft = () => {
    setLoadingMoreComments(true);
    setActiveReviews(
      reviews.slice(
        (currentPage - 2) * reviewsPerPage,
        (currentPage - 2) * reviewsPerPage + reviewsPerPage
      )
    );
    setCurrentPage(currentPage - 1);
    setTimeout(() => {
      setLoadingMoreComments(false);
    }, 300);
  };

  const afterAuth = () => {
    setShowPackageModal(true);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(reviews.length / reviewsPerPage));
    setCurrentPage(1);
    setActiveReviews(reviews.slice(0, reviewsPerPage));
  }, [reviewsPerPage]);

  useEffect(() => {
    setActiveReviews(reviews.slice(0, reviewsPerPage));
  }, [reviews]);

  return (
    <div className="reviews-temp2-wrp">
      <ModalNewReview
        handleClose={() => setShowPackageModal(false)}
        open={showPackageModal}
        idAliado={idAliado}
        idUser={
          stateUser.isAuthenticated && stateUser.userInfo
            ? stateUser.userInfo.id
            : null
        }
        setReloadInfo={setReloadInfo}
      />
      <ModalRegistro
        handleClose={() => setOpenRegistroModal(false)}
        open={openRegistroModal}
        titleModal={"Regístrate para escribir reseñas"}
        openLogin={() => setOpenLoginModal(true)}
        afterRegister={afterAuth}
      />
      <ModalLogin
        handleClose={() => setOpenLoginModal(false)}
        open={openLoginModal}
        afterLogin={afterAuth}
        openRegister={() => setOpenRegistroModal(true)}
      />
      <div style={mobile ? null : { padding: "10px" }}>
        <hr />
        <p className="reviews-temp2-wrp-title">
          {avgScore.toFixed(1)}
          <IoStar
            style={{
              marginBottom: "7px",
              color: "#8c50ff",
              marginLeft: "4px",
              fontSize: "1.2rem",
            }}
          />{" "}
          - {reviews.length} Reseñas
        </p>
        {reviews.length ? (
          <>
            <div className="reviews-temp2-wrp-controller">
              <FaAngleLeft
                className={
                  currentPage === 1 || loadingMoreComments
                    ? "carouselV2-control-btn-innactive"
                    : "carouselV2-control-btn"
                }
                onClick={onClickLeft}
              />
              <p
                className="carouselV2-control-pagination"
                style={loadingMoreComments ? { color: "#dedede" } : null}
              >
                {currentPage} / {totalPages}
              </p>
              <FaAngleRight
                className={
                  currentPage === totalPages || loadingMoreComments
                    ? "carouselV2-control-btn-innactive"
                    : "carouselV2-control-btn"
                }
                onClick={onClickRight}
              />
            </div>
            <div className="reviews-temp2-flex">
              {activeReviews.map((item) => (
                <div
                  className={`${
                    loadingMoreComments ? "loading" : null
                  } reviews-temp2-comment`}
                  key={item.id}
                >
                  <p className="reviews-temp2-comment-name">
                    {item.name}{" "}
                    <span>
                      - {item.score}
                      <IoStar
                        style={{
                          marginBottom: "3px",
                          color: "#8c50ff",
                          marginLeft: "2px",
                        }}
                      />
                    </span>
                  </p>
                  <p className="reviews-temp2-comment-date">
                    {item.dateCreated}
                  </p>
                  <p className="reviews-temp2-comment-text">{item.comment}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="reviews-temp2-wrp-no-reviews">
            Aún no se escriben reseñas :(
          </p>
        )}
        <Button
          className={`${classes.buttonReview} reviews-temp2-wrp-button`}
          onClick={() => {
            if (stateUser.isAuthenticated && stateUser.userInfo) {
              if (!stateUser.userInfo.isVerified) {
                toast.dismiss();
                toast.warn(
                  "Parece que no has verificado tu cuenta! por favor revisa tu email, pudo haber llegado a la bandeja de spam.",
                  {
                    position: "bottom-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              } else {
                setShowPackageModal(true);
              }
            } else {
              setOpenLoginModal(true);
            }
          }}
        >
          Agregar reseña
        </Button>
      </div>
    </div>
  );
}
