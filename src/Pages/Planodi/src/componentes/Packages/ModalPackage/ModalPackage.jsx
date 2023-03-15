import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./ModalPackage.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";

export default function ModalPackage({
  handleClose,
  open,
  info,
  openGaleriaPaquetes,
  setOpenGaleriaPaquetes,
  activeImage,
  setActiveImage,
}) {
  const mobile = useMediaQuery("(max-width:400px)");

  const changeImage = (direccion) => {
    if (direccion > 0) {
      activeImage === info.allImages.length - 1
        ? setActiveImage(0)
        : setActiveImage(activeImage + 1);
    }
    if (direccion < 0) {
      activeImage === 0
        ? setActiveImage(info.allImages.length - 1)
        : setActiveImage(activeImage - 1);
    }
  };

  return (
    <Dialog
      onClose={() => {
        setActiveImage(0);
        handleClose();
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="xs"
      fullScreen={mobile}
      style={{ minWidth: "320px" }}
      className="modal-package-wrp-gen"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => {
          setActiveImage(0);
          handleClose();
        }}
        style={{
          position: "relative",
          height: "3.3rem",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => {
            setActiveImage(0);
            handleClose();
          }}
          style={{
            position: "absolute",
            right: "6px",
            top: "3px",
          }}
          className="modal-reg-titulo"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="modal-package-wrp-div">
          <div className="modal-package-images-div">
            <div className="modal-package-images-wrp">
              <div
                className="modal-package-images-gall"
                onClick={() => {
                  setOpenGaleriaPaquetes(true);
                }}
              >
                Ver en galería
              </div>
              <FaAngleLeft
                className={
                  activeImage === 0
                    ? "modal-package-control-arrows-innactive"
                    : "modal-package-control-arrows"
                }
                style={{ left: "1px" }}
                onClick={() => changeImage(-1)}
              />
              <img
                src={info.allImages[activeImage]}
                alt="imagen de paquete"
                className="modal-package-images"
                onClick={() => {
                  setOpenGaleriaPaquetes(true);
                }}
              />
              <FaAngleRight
                className={
                  activeImage + 1 === info.allImages.length
                    ? "modal-package-control-arrows-innactive"
                    : "modal-package-control-arrows"
                }
                style={{ right: "1px" }}
                onClick={() => changeImage(1)}
              />
            </div>
          </div>
          <div className="modal-package-img-dots">
            {Array(info.allImages.length >= 5 ? 5 : info.allImages.length)
              .fill(0)
              .map((item, idx) => (
                <div key={idx}>
                  <FiberManualRecordIcon
                    className={
                      activeImage === idx || (activeImage >= 4 && idx === 4)
                        ? "modal-package-dot-imgs-dot active"
                        : "modal-package-dot-imgs-dot"
                    }
                  />
                </div>
              ))}
          </div>
          <p className="modal-package-title">{info.name || info.title}</p>
          <p className="modal-package-price">{`$${parseInt(
            info.price
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })} MXN`}</p>
          <p className="modal-package-desc">{info.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
