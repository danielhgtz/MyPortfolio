import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BsCardImage, BsCameraVideoFill } from "react-icons/bs";

import "./GalleryTemplate2.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TIPOS_DE_MULTIMEDIA } from "../../../../Utils/variablesGlobalesYStatics";

export default function GalleryTemplate2({
  showGallery,
  setShowGallery,
  imagenActualGal,
  imagenes,
  changeImage,
  changeVideo,
  videos,
  videoActualGal,
  initialMedia,
}) {
  const mobile = useMediaQuery("(max-width:560px)");

  const [activeMultimedia, setActiveMultimedia] = useState(initialMedia);

  useEffect(() => {
    const handleType = (event) => {
      const key = event.key;
      if (key === "ArrowLeft") {
        if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
          changeImage(-1);
        }
        if (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos) {
          changeVideo(-1);
        }
      }
      if (key === "ArrowRight") {
        if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
          changeImage(1);
        }
        if (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos) {
          changeVideo(1);
        }
      }
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [changeImage]);

  return (
    <div
      className={`${
        showGallery ? "active-gallery" : ""
      } template2-galeria-completa`}
    >
      <div className="temp2-gallery-nav">
        <div className="temp2-gall-btns-wrp">
          <div
            className={`temp2-gall-btns-btn ${
              activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes && "active"
            }`}
            onClick={() => setActiveMultimedia(TIPOS_DE_MULTIMEDIA.imagenes)}
          >
            <BsCardImage />
            <p>Imágenes</p>
          </div>
          {videos.length ? (
            <div
              className={`temp2-gall-btns-btn ${
                activeMultimedia === TIPOS_DE_MULTIMEDIA.videos && "active"
              }`}
              onClick={() => setActiveMultimedia(TIPOS_DE_MULTIMEDIA.videos)}
            >
              <BsCameraVideoFill />
              <p>Videos</p>
            </div>
          ) : null}
        </div>
        <div
          className="temp2-gall-close-btn"
          onClick={() => setShowGallery(false)}
        >
          <IoCloseOutline style={{ fontSize: "20px", marginBottom: "2px" }} />{" "}
          Cerrar
        </div>
        {!mobile && (
          <div className="temp2-gall-imgs-control">
            <p className="temp2-gall-cont-num">
              {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes
                ? `${imagenActualGal + 1} / ${imagenes.length}`
                : `${videoActualGal + 1}/ ${videos.length}`}
            </p>
          </div>
        )}
      </div>
      <div className="temp2-gallery-images-wrp">
        {mobile && (
          <div className="temp2-gall-imgs-control-mobile">
            {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes ||
            (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos &&
              videos.length > 1) ? (
              <FaAngleLeft
                className="temp2-gall-cont-btn"
                onClick={() => {
                  if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
                    changeImage(-1);
                  } else {
                    changeVideo(-1);
                  }
                }}
              />
            ) : null}
            <p className="temp2-gall-cont-num">
              {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes
                ? `${imagenActualGal + 1} / ${imagenes.length}`
                : `${videoActualGal + 1}/ ${videos.length}`}
            </p>
            {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes ||
            (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos &&
              videos.length > 1) ? (
              <FaAngleRight
                className="temp2-gall-cont-btn"
                onClick={() => {
                  if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
                    changeImage(1);
                  } else {
                    changeVideo(1);
                  }
                }}
              />
            ) : null}
          </div>
        )}
        <div className="temp2-gall-arrow">
          {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes ||
          (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos &&
            videos.length > 1) ? (
            <button
              onClick={() => {
                if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
                  changeImage(-1);
                } else {
                  changeVideo(-1);
                }
              }}
              className="temp2-gall-arrow-btn"
            >
              <FaAngleLeft style={{ margin: "-4px 0 0 -2px" }} />
            </button>
          ) : null}
        </div>
        <div className="temp2-gall-images">
          <div className="temp2-gall-imgs-images">
            {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes ? (
              <img
                src={imagenes[imagenActualGal]}
                alt="Imagen aliado"
                style={
                  mobile
                    ? { maxHeight: "100%", maxWidth: "100%" }
                    : {
                        maxHeight: "98%",
                        maxWidth: "98%",
                      }
                }
              />
            ) : (
              <iframe
                width={mobile ? "90%" : "100%"}
                height={mobile ? "500" : "90%"}
                src={`https://www.youtube.com/embed/${videos[videoActualGal]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
        <div className="temp2-gall-arrow">
          {activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes ||
          (activeMultimedia === TIPOS_DE_MULTIMEDIA.videos &&
            videos.length > 1) ? (
            <button
              onClick={() => {
                if (activeMultimedia === TIPOS_DE_MULTIMEDIA.imagenes) {
                  changeImage(1);
                } else {
                  changeVideo(1);
                }
              }}
              className="temp2-gall-arrow-btn"
            >
              <FaAngleRight style={{ margin: "-4px 0 0 2px" }} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

GalleryTemplate2.defaultProps = {
  changeVideo: () => {},
  videos: [],
  initialMedia: TIPOS_DE_MULTIMEDIA.imagenes,
};
