/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { GoVerified } from "react-icons/go/index";
import { IoAppsOutline } from "react-icons/io5";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { AiOutlineCar } from "react-icons/ai";
import { BiDrink, BiSun } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useSelector } from "react-redux";
import { FaSwimmingPool } from "react-icons/fa";
import { IoStar } from "react-icons/io5/index";

import Reviews from "./Reviews/Reviews";
import Navbar, { useAuthModals } from "../../HomePage/Navbar/Navbar";
import SelectedPackageBox from "./SelectedPackageBox/SelectedPackageBox";
import CarouselV2 from "../../../componentes/CarouselV2/CarouselV2";
import "./Template2.css";
import Footer from "../../HomePage/Footer/Footer";
import GalleryTemplate2 from "./GalleryTemplate2/GalleryTemplate2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import DotLoading from "../../../componentes/DotLoading/DotLoading";
import ModalRegistro from "../../HomePage/Navbar/ModalRegistro/ModalRegistro";
import ModalLogin from "../../HomePage/Navbar/ModalLogin/ModalLogin";
import { toast } from "react-toastify";
import { AiFillYoutube } from "react-icons/ai/index";
import { TIPOS_DE_MULTIMEDIA } from "../../../Utils/variablesGlobalesYStatics";

export default function Template2() {
  const stateUser = useSelector((state) => state.user);
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();
  const { pathName } = useParams();
  const [idAliado, setIdAliado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [imagenActualGal, setImagenActualGal] = useState(0);
  const [videoActualGal, setVideoActualGal] = useState(0);
  const [isTerraza, setIsTerraza] = useState(true);
  const [bigGallery, setBigGallery] = useState(false);
  const [fixBox, setFixBox] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [activePackage, setActivePackage] = useState(1);
  const [widthBox, setWidthBox] = useState(0);
  const [heightBox, setHeightBox] = useState(0);
  const [infoAliado, setInfoAliado] = useState(null);
  const [imagesGallery, setImagesGallery] = useState([]);
  const [videosGallery, setVideosGallery] = useState([]);
  const [multimediaPackages, setMultimediaPackages] = useState([]);
  const [openGaleriaPaquetes, setOpenGaleriaPaquetes] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgScore, setAvgScore] = useState(5);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);
  const [reloadInfo, setReloadInfo] = useState(0);
  const [activeImagePckg, setActiveImagePckg] = useState(0);
  const [dateSelected, setDateSelected] = useState(null);
  const [busyDates, setBusyDates] = useState([]);
  const [visibleHeight, setVisibleHeight] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  // const [touchStart, setTouchStart] = useState(0);
  // const [touchEnd, setTouchEnd] = useState(0);
  const [activeScrollImage, setActiveScrollImage] = useState(1);
  const [isPendingValidation, setIsPendingValidation] = useState(false);
  const [initialMediaGallery, setInitialMediaGallery] = useState(
    TIPOS_DE_MULTIMEDIA.imagenes
  );

  const ref = useRef(null);
  const refFLexImages = useRef(null);
  const refContent = useRef(null);
  const mobile = useMediaQuery("(max-width:960px)");
  const midSize = useMediaQuery("(max-width:580px)");
  const navigate = useNavigate();

  useEffect(() => {
    // window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/aliadoProfile?username=${pathName}`,
        userHeaders(false)
      )
      .then((res) => {
        const {
          aliadoInfoGeneral,
          infoSecundaria,
          images,
          videos,
          packages,
          multimediaPackages,
          reviews,
          avarageScore,
        } = res.data;
        setVideosGallery(videos);
        setLogoUrl(aliadoInfoGeneral?.logoUrl);
        setReviews(reviews);
        setAvgScore(avarageScore);
        delete infoSecundaria.id;
        let packagesWithImages = [];
        if (packages.length) {
          packagesWithImages = packages.map((item) => {
            let mainImage = "";
            let allImages = [];
            multimediaPackages.forEach((itemImg) => {
              if (itemImg.idPackage === item.id) {
                allImages.push(itemImg.url);
                if (itemImg.main) {
                  mainImage = itemImg.url;
                }
              }
            });
            return { ...item, mainImage, allImages };
          });
        }
        document.title = aliadoInfoGeneral.nombre;
        setInfoAliado({
          ...aliadoInfoGeneral,
          ...infoSecundaria,
          packages: packagesWithImages,
        });
        setActivePackage(packages.length ? packagesWithImages[0].id : null);
        setIdAliado(aliadoInfoGeneral.id);
        const imagesGalUrl = images.map((item) => item.url);
        setIsTerraza(aliadoInfoGeneral.tipo === 3);
        setImagesGallery(imagesGalUrl);
        setMultimediaPackages(multimediaPackages);
        setBigGallery(imagesGalUrl.length >= 5);
        setVisibleHeight(window.innerHeight);
        setLoading(false);
      })
      .catch(() => {
        navigate.push("/buscador");
      });
  }, [reloadInfo, pathName]);

  useEffect(() => {
    if (idAliado) {
      setLoading(true);
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }aliado/getMisReservas?idAliado=${idAliado}`,
          userHeaders(false)
        )
        .then((res) => {
          const today = new Date().getUTCDate();
          setBusyDates(
            res.data.filter(
              (reserva) => new Date(reserva.fechaReserva).getUTCDate() >= today
            )
          );
          setLoading(false);
        })
        .catch(() => {
          navigate.push("/buscador");
        });
    }
  }, [idAliado]);

  useEffect(() => {
    if (infoAliado && stateUser) {
      const isPending =
        !infoAliado?.isApproved &&
        infoAliado?.usuario !== stateUser?.userInfo?.id &&
        !stateUser?.userInfo?.isAdmin;
      setIsPendingValidation(isPending);
      if (isPending) {
        toast.dismiss();
        toast.warn(
          "Este negocio esta siendo validado por Planodi, por el momento no esta disponible!",
          {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            progress: undefined,
            onClick: () => {
              navigate.push("/");
              toast.dismiss();
            },
          }
        );
      }
    }
  }, [stateUser, infoAliado]);

  const clickImage = (image) => {
    setImagenActualGal(image);
    setInitialMediaGallery(TIPOS_DE_MULTIMEDIA.imagenes);
    setShowGallery(true);
  };

  const getListSize = () => {
    if (ref && ref.current && ref.current.clientWidth) {
      const newWidth = ref.current.clientWidth;
      setWidthBox(newWidth - 24.5);
    }
  };

  const handleContactarButton = (date) => {
    if (stateUser.isAuthenticated) {
      if (stateUser.userInfo?.isVerified) {
        window.open(
          `https://api.whatsapp.com/send?phone=52${
            infoAliado.whatsapp
          }&text=%C2%A1Hola!%20Encontr%C3%A9%20su%20perfil%20en%20planodi%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.${
            date ? `%20Mi%20evento%20es%20el%20${date}.` : ""
          }`,
          "_blank"
        );
      } else {
        toast.dismiss();
        toast.warn(
          "Parece que no has verificado tu cuenta! Por favor revisa tu email, pudo haber llegado a la bandeja de spam.",
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
      }
    } else {
      setOpenLoginModal(true);
    }
  };

  useEffect(() => {
    getListSize();
    if (refContent && refContent.current && refContent.current.clientHeight) {
      setHeightBox(refContent.current.clientHeight - 335);
    }
  }, [loading]);

  useEffect(() => {
    const fixNavbar = () => {
      if (window.scrollY >= 488 && window.scrollY <= heightBox) {
        setFixBox(true);
      } else {
        setFixBox(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);

    return () => window.removeEventListener("scroll", fixNavbar);
  }, [heightBox]);

  useEffect(() => {
    window.addEventListener("resize", getListSize);
    return () => window.removeEventListener("resize", getListSize);
  }, []);

  const changeImage = (direccion) => {
    if (direccion > 0) {
      imagenActualGal === imagesGallery.length - 1
        ? setImagenActualGal(0)
        : setImagenActualGal(imagenActualGal + 1);
    }
    if (direccion < 0) {
      imagenActualGal === 0
        ? setImagenActualGal(imagesGallery.length - 1)
        : setImagenActualGal(imagenActualGal - 1);
    }
  };

  const changeVideo = (direccion) => {
    if (direccion > 0) {
      videoActualGal === videosGallery.length - 1
        ? setVideoActualGal(0)
        : setVideoActualGal(videoActualGal + 1);
    }
    if (direccion < 0) {
      videoActualGal === 0
        ? setVideoActualGal(videosGallery.length - 1)
        : setVideoActualGal(videoActualGal - 1);
    }
  };

  const changeImagePackages = (direccion, allImages) => {
    if (direccion > 0) {
      activeImagePckg === allImages.length - 1
        ? setActiveImagePckg(0)
        : setActiveImagePckg(activeImagePckg + 1);
    }
    if (direccion < 0) {
      activeImagePckg === 0
        ? setActiveImagePckg(allImages.length - 1)
        : setActiveImagePckg(activeImagePckg - 1);
    }
  };

  useEffect(() => {
    if (mobile) {
      setReviewsPerPage(2);
    } else {
      setReviewsPerPage(4);
    }
  }, [mobile]);

  const resizeVisibleHeight = () => {
    setVisibleHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeVisibleHeight);

    return () => window.removeEventListener("resize", resizeVisibleHeight);
  }, []);

  const handleScrollImage = () => {
    if (refFLexImages && refFLexImages.current) {
      setActiveScrollImage(
        Math.ceil(
          refFLexImages.current.scrollLeft / refFLexImages.current.clientWidth
        ) + 1
      );
    }
  };

  // const handleTouchStart = (e) => {
  //   setTouchStart(e.targetTouches[0].clientX);
  // };
  //
  // const handleTouchMove = (e) => {
  //   setTouchEnd(e.targetTouches[0].clientX);
  // };
  //
  // const handleTouchEnd = () => {
  //   if (touchStart - touchEnd > 70) {
  //     // do your stuff here for left swipe
  //     // moveSliderRight();
  //     console.log("right");
  //   }
  //
  //   if (touchStart - touchEnd < -70) {
  //     // do your stuff here for right swipe
  //     // moveSliderLeft();
  //     console.log("left");
  //   }
  // };

  return (
    <div className="temp2-wrapper-parent">
      <ModalRegistro
        handleClose={() => setOpenRegistroModal(false)}
        open={openRegistroModal}
        titleModal={"Regístrate antes"}
        openLogin={() => setOpenLoginModal(true)}
      />
      <ModalLogin
        handleClose={() => setOpenLoginModal(false)}
        open={openLoginModal}
        openRegister={() => setOpenRegistroModal(true)}
      />
      {loading ? (
        <DotLoading />
      ) : !showGallery ? (
        <>
          <div
            className="temp2-wrapper"
            style={mobile ? { height: `${visibleHeight * 0.8}px` } : null}
          >
            <div className="temp2-wrapper-div">
              {mobile &&
              document.referrer !== "" &&
              document.referrer !== window.location.href ? (
                <>
                  <div className="temp2-top-nav-mobile">
                    <div className="temp2-back-mobile-button">
                      <p
                        className="temp2-back-mobile-button-p"
                        onClick={() => {
                          navigate.goBack();
                        }}
                      >
                        <span>
                          <IoIosArrowBack
                            style={{ fontSize: "1rem", marginBottom: "3px" }}
                          />
                        </span>
                        Regresar
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      zIndex: -100,
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <Navbar type="black" shadow />
                  </div>
                </>
              ) : (
                <Navbar type="black" shadow />
              )}
              {midSize && (
                <div style={{ position: "relative", width: "100%" }}>
                  <div className="temp2-gall-mobile-counter-img">
                    <p>
                      {activeScrollImage} / {imagesGallery.length}
                    </p>
                  </div>

                  <div
                    className="temp2-gall-mobile-wrp"
                    ref={refFLexImages}
                    onScroll={handleScrollImage}
                  >
                    <div
                      className="temp2-gall-mobile-flex"
                      style={{ width: `${100 * imagesGallery.length}%` }}
                      // onTouchStart={(touchStartEvent) =>
                      //   handleTouchStart(touchStartEvent)
                      // }
                      // onTouchMove={(touchMoveEvent) =>
                      //   handleTouchMove(touchMoveEvent)
                      // }
                      // onTouchEnd={handleTouchEnd}
                    >
                      {imagesGallery.map((item, idx) => (
                        <img
                          className="temp2-gall-mobile-img"
                          style={{ background: `url(${imagesGallery[idx]})` }}
                          onClick={() =>
                            !isPendingValidation && clickImage(idx)
                          }
                          key={idx}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="temp2-content-wrp" ref={refContent}>
              <div className="temp2-title-wrp-flex">
                <div className="temp2-wrp-flex-logo-titulo">
                  {logoUrl ? (
                    <div
                      className="temp2-logo-negocio"
                      style={{ background: `url(${logoUrl})` }}
                    />
                  ) : null}
                  <p className="temp2-title">
                    {infoAliado.nombre}
                    {!!infoAliado.verificado && (
                      <span style={{ color: "#8c50ff", marginLeft: "1rem" }}>
                        <GoVerified
                          style={{
                            marginBottom: "0.3rem",
                            fontSize: "1.4rem",
                          }}
                        />
                      </span>
                    )}
                  </p>
                </div>

                <p className="temp2-subtitle">
                  <span>
                    <IoLocationOutline style={{ marginBottom: "0.1rem" }} />
                  </span>
                  {`${infoAliado.estado} ${
                    infoAliado.ciudad ? `- ${infoAliado.ciudad}` : ""
                  }`}
                </p>
                {midSize ? null : (
                  <p className="temp2-subtitle">
                    <BsDot />
                  </p>
                )}
                <p className="temp2-subtitle">{infoAliado.category}</p>
                {midSize ? null : (
                  <p className="temp2-subtitle">
                    <BsDot />
                  </p>
                )}
                <p className="temp2-subtitle">
                  {avgScore.toFixed(1)}
                  <IoStar
                    style={{
                      marginBottom: "3px",
                      color: "#8c50ff",
                      marginLeft: "3px",
                      fontSize: "0.8rem",
                    }}
                  />
                  <span className="temp2-subtitle-comments">
                    ({reviews.length})
                  </span>
                </p>
                {midSize ? null : (
                  <p className="temp2-subtitle">
                    <BsDot />
                  </p>
                )}
                <p className="temp2-subtitle">
                  {infoAliado.precio ? infoAliado.precio : "$$$"}
                </p>
                {!midSize && (
                  <div className="temp2-galeria">
                    <div
                      className={
                        bigGallery
                          ? "temp2-galeria-fotos-5img"
                          : "temp2-galeria-fotos-3img"
                      }
                    >
                      <div
                        style={{ background: `url(${imagesGallery[0]})` }}
                        className={`temp2-box temp2-box1${
                          bigGallery ? "" : "-3img"
                        }`}
                        onClick={() => !isPendingValidation && clickImage(0)}
                      />
                      <div
                        className={`temp2-box temp2-box2${
                          bigGallery ? "" : "-3img"
                        }`}
                        style={{ background: `url(${imagesGallery[1]})` }}
                        onClick={() => !isPendingValidation && clickImage(1)}
                      />
                      <div
                        className={`temp2-box temp2-box3${
                          bigGallery ? "" : "-3img"
                        }`}
                        style={{ background: `url(${imagesGallery[2]})` }}
                        onClick={() => !isPendingValidation && clickImage(2)}
                      />
                      {bigGallery ? (
                        <>
                          <div
                            className="temp2-box temp2-box4"
                            style={{
                              background: `url(${imagesGallery[3]})`,
                            }}
                            onClick={() =>
                              !isPendingValidation && clickImage(3)
                            }
                          />
                          <div
                            className="temp2-box temp2-box5"
                            style={{
                              background: `url(${imagesGallery[4]})`,
                            }}
                            onClick={() =>
                              !isPendingValidation && clickImage(4)
                            }
                          />
                        </>
                      ) : null}
                      <div
                        className="temp2-boton-galeria"
                        onClick={() => {
                          if (!isPendingValidation) {
                            setInitialMediaGallery(
                              TIPOS_DE_MULTIMEDIA.imagenes
                            );
                            setShowGallery(true);
                          }
                        }}
                      >
                        <p className="temp2-btn-texto">
                          <IoAppsOutline
                            style={{
                              marginRight: "5px",
                              marginBottom: "2px",
                              fontSize: "1.1rem",
                            }}
                          />
                          Ver galería completa
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="temp2-grid-content">
                  <div
                    className="temp2-info-wrp"
                    style={mobile ? { marginTop: "2rem" } : null}
                  >
                    {infoAliado.packages.length ? (
                      <>
                        <CarouselV2
                          infoCards={infoAliado.packages}
                          activePackage={activePackage}
                          widthCard={280}
                          cardPackages
                          loading={false}
                          title="Paquetes"
                          // blurLastOne
                          pagiantionAtEnd
                          onClickPackage={(id) => {
                            if (!isPendingValidation) {
                              if (mobile) {
                                navigate.push(`/paquetes/${id}`);
                              } else {
                                window.open(
                                  `${window.location.origin}/paquetes/${id}`,
                                  "_blank"
                                );
                              }
                            }
                          }}
                        />
                        <hr style={{ marginTop: "2.5rem" }} />
                      </>
                    ) : null}
                    <div className="temp2-general-inf-wrp">
                      <p className="temp2-general-inf-title">Descripción</p>
                      <p className="temp2-general-inf-p">
                        {infoAliado.descripcion}
                      </p>
                    </div>
                    {isTerraza ? (
                      <>
                        <hr
                          style={{
                            marginTop: "2.5rem",
                            marginBottom: "2.5rem",
                          }}
                        />
                        <div className="temp2-info-terrazas-icons-wrp">
                          <div style={{ display: "flex", margin: "1rem 1rem" }}>
                            <IoMdPeople style={{ fontSize: "1.8rem" }} />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "0.6rem",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0",
                                  fontWeight: 500,
                                  color: "#3b3b3b",
                                }}
                              >
                                Capacidad
                              </p>
                              <p
                                style={{
                                  margin: "0",
                                  fontSize: "0.9rem",
                                  color: "#7a7a7a",
                                }}
                              >
                                {infoAliado.capacidad} personas
                              </p>
                            </div>
                          </div>
                          {infoAliado.estacionamiento ? (
                            <div
                              style={{
                                display: "flex",
                                margin: "1rem 1rem",
                              }}
                            >
                              <AiOutlineCar style={{ fontSize: "1.8rem" }} />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginLeft: "0.6rem",
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0",
                                    fontWeight: 500,
                                    color: "#3b3b3b",
                                  }}
                                >
                                  Estacionamiento
                                </p>
                              </div>
                            </div>
                          ) : null}
                          <div style={{ display: "flex", margin: "1rem 1rem" }}>
                            <BiDrink style={{ fontSize: "1.8rem" }} />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "0.6rem",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0",
                                  fontWeight: 500,
                                  color: "#3b3b3b",
                                }}
                              >
                                {infoAliado.alcohol
                                  ? "Alcohol permitido"
                                  : "Alcohol no permitido"}
                              </p>
                            </div>
                          </div>
                          {infoAliado.eventosDia || infoAliado.eventosNoche ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  margin: "1rem 1rem",
                                }}
                              >
                                {infoAliado.eventosDia &&
                                infoAliado.eventosNoche ? (
                                  <TiWeatherPartlySunny
                                    style={{ fontSize: "1.8rem" }}
                                  />
                                ) : infoAliado.eventosNoche ? (
                                  <IoMoonOutline
                                    style={{ fontSize: "1.8rem" }}
                                  />
                                ) : (
                                  <BiSun style={{ fontSize: "1.8rem" }} />
                                )}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "0.6rem",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0",
                                      fontWeight: 500,
                                      color: "#3b3b3b",
                                    }}
                                  >
                                    {infoAliado.eventosDia &&
                                    infoAliado.eventosNoche
                                      ? "Eventos de día y noche"
                                      : infoAliado.eventosNoche
                                      ? "Eventos de noche"
                                      : "Eventos de día"}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : null}
                          {infoAliado.alberca ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  margin: "1rem 1rem",
                                }}
                              >
                                <FaSwimmingPool
                                  style={{ fontSize: "1.8rem" }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "0.6rem",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0",
                                      fontWeight: 500,
                                      color: "#3b3b3b",
                                    }}
                                  >
                                    Alberca
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                    {videosGallery.length ? (
                      <>
                        <hr
                          style={{
                            marginTop: "2.5rem",
                            marginBottom: "2.5rem",
                          }}
                        />
                        <div className="temp2-general-inf-wrp">
                          <p className="temp2-general-inf-title">Videos</p>
                          <div
                            className="temp2-video-section"
                            onClick={() => {
                              if (!isPendingValidation) {
                                setInitialMediaGallery(
                                  TIPOS_DE_MULTIMEDIA.videos
                                );
                                setShowGallery(true);
                              }
                            }}
                          >
                            <div className="temp2-video-section-button">
                              <AiFillYoutube className="temp2-video-section-button-content temp2-video-section-button-icono" />
                              <p
                                className="temp2-video-section-button-content temp2-video-section-button-p"
                                style={{ marginTop: "3rem" }}
                              >
                                Click para ver videos
                              </p>
                            </div>
                            <iframe
                              width="560"
                              height="315"
                              src={`https://www.youtube.com/embed/${videosGallery[0]}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {isTerraza ? (
                      <>
                        <hr style={{ marginTop: "2.5rem" }} />
                        <div className="temp2-general-inf-wrp">
                          <p className="temp2-general-inf-title">Dirección</p>
                          <p className="temp2-general-inf-p">
                            {infoAliado.direccion}
                          </p>
                        </div>
                      </>
                    ) : null}
                    {isTerraza ? (
                      <>
                        <hr style={{ marginTop: "2.5rem" }} />
                        <div className="temp2-general-inf-wrp">
                          <p className="temp2-general-inf-title">Espacios</p>
                          <p className="temp2-general-inf-p">
                            {infoAliado.espacios}
                          </p>
                        </div>
                      </>
                    ) : null}
                    <hr style={{ marginTop: "2.5rem" }} />
                    <div className="temp2-general-inf-wrp">
                      <p className="temp2-general-inf-title">Servicios</p>
                      <p className="temp2-general-inf-p">
                        {infoAliado.servicios}
                      </p>
                    </div>
                    {isTerraza ? null : (
                      <>
                        <hr style={{ marginTop: "2.5rem" }} />
                        <div className="temp2-general-inf-wrp">
                          <p className="temp2-general-inf-title">Experiencia</p>
                          <p className="temp2-general-inf-p">
                            {infoAliado.experiencia}
                          </p>
                        </div>
                      </>
                    )}
                    {isTerraza ? null : (
                      <>
                        <hr style={{ marginTop: "2.5rem" }} />
                        <div className="temp2-general-inf-wrp">
                          <p className="temp2-general-inf-title">
                            ¿Dónde ofrecen?
                          </p>
                          <p className="temp2-general-inf-p">
                            {infoAliado.dondeOfrecen}
                          </p>
                        </div>
                      </>
                    )}
                    <hr style={{ marginTop: "2.5rem" }} />
                    <div className="temp2-general-inf-wrp">
                      <p className="temp2-general-inf-title">
                        Preguntas frecuentes
                      </p>
                      {isTerraza ? (
                        <>
                          {infoAliado.q1 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Celebra más de un evento al día?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q1}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q2 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Es posible rentar sólo el espacio, sin otros
                                servicios?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q2}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q3 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Hay límite de hora en los eventos?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q3}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q4 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Tiene exclusividad con algún fotógrafo?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q4}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q5 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Tiene exclusividad con algún grupo musical?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q5}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q6 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Tiene exclusividad con algún banquete?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q6}
                              </p>
                            </>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {infoAliado.q1 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Se requeire de algún material o condiciones
                                específicas para poder ofrecer sus servicios?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q1}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q2 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Hay algún costo extra por desplazamiento?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q2}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q3 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Cuánto tiempo dura el servicio?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q3}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q4 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Cobra por horas o por evento?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q4}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q5 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿Hay posibilidad de pagar por horas extras?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q5}
                              </p>
                            </>
                          ) : null}
                          {infoAliado.q6 ? (
                            <>
                              <p className="temp2-general-inf-faq">
                                ¿En que Estados de México trabajan?
                              </p>
                              <p className="temp2-general-inf-p">
                                {infoAliado.q6}
                              </p>
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className="temp2-selected-wrp"
                    ref={ref}
                    style={
                      window.scrollY >= heightBox
                        ? { alignItems: "flex-end" }
                        : { alignItems: "flex-start" }
                    }
                  >
                    <SelectedPackageBox
                      fixBox={fixBox}
                      width={widthBox}
                      dateSelected={dateSelected}
                      setDateSelected={setDateSelected}
                      handleContactarButton={handleContactarButton}
                      busyDates={busyDates}
                      isPendingValidation={isPendingValidation}
                      instagram={infoAliado.instagram}
                      facebook={infoAliado.facebook}
                      youtube={infoAliado.youtube}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!isPendingValidation && (
              <Reviews
                idAliado={idAliado}
                stateUser={stateUser}
                reviews={reviews}
                avgScore={avgScore}
                reviewsPerPage={reviewsPerPage}
                setReloadInfo={setReloadInfo}
              />
            )}

            <Footer />
          </div>

          <div
            className="temp2-box-selected-mobile"
            style={mobile ? { height: `${visibleHeight * 0.2}px` } : null}
          >
            <SelectedPackageBox
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
              handleContactarButton={handleContactarButton}
              busyDates={busyDates}
              isPendingValidation={isPendingValidation}
              instagram={infoAliado.instagram}
              facebook={infoAliado.facebook}
              youtube={infoAliado.youtube}
            />
          </div>
        </>
      ) : (
        <GalleryTemplate2
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          imagenActualGal={imagenActualGal}
          videoActualGal={videoActualGal}
          imagenes={imagesGallery}
          videos={videosGallery}
          changeImage={changeImage}
          changeVideo={changeVideo}
          initialMedia={initialMediaGallery}
        />
      )}
    </div>
  );
}
