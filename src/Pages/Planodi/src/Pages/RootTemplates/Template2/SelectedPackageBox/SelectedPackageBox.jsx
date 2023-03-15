import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";
import { AiFillYoutube, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

import "./SelectedPackageBox.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DatePicker from "../../../../componentes/DatePicker/DatePicker";

const buttonBox = makeStyles(() => ({
  button: {
    backgroundColor: "#8c50ff",
    color: "white",
    // textTransform: "none",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "#0D3B66",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonMobile: {
    backgroundColor: "#8c50ff",
    color: "white",
    fontSize: "0.7rem",
    textTransform: "none",
    padding: "8px 8px",
    "&:hover": {
      backgroundColor: "#0D3B66",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

/**
 * @param {{id: number,title: string, price: string, mainImage: string, description: string, allImages: [string]}} data
 * @param fixBox
 * @param width
 * @param onClickVerMas
 * */
export default function SelectedPackageBox({
  fixBox,
  width,
  dateSelected,
  setDateSelected,
  handleContactarButton,
  busyDates,
  isPendingValidation,
  instagram,
  facebook,
  youtube,
}) {
  const classes = buttonBox();
  const mobile = useMediaQuery("(max-width:960px)");

  return (
    <>
      {mobile ? (
        <div className="temp2-sel-box-wrp">
          {/*Para después, una barra para desplazar hacia arriba*/}
          {/*<div*/}
          {/*  style={{*/}
          {/*    width: "100%",*/}
          {/*    display: "flex",*/}
          {/*    justifyContent: "center",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <div className="temp2-sel-box-wrp-slide" />*/}
          {/*</div>*/}
          <p
            className="temp2-sel-box-wrp-instruction"
            style={{ fontSize: "0.8rem" }}
          >
            Información de contacto
          </p>
          <div style={{ width: "50%" }}>
            <div className="temp2-sel-box-redes-s-wrp">
              {!!instagram && (
                <AiFillInstagram
                  className="temp2-sel-box-redes-s-wrp-icon"
                  onClick={() => {
                    window.open(instagram, "_blank");
                  }}
                />
              )}
              {!!facebook && (
                <AiFillFacebook
                  className="temp2-sel-box-redes-s-wrp-icon"
                  onClick={() => {
                    window.open(facebook, "_blank");
                  }}
                />
              )}
              {!!youtube && (
                <AiFillYoutube
                  className="temp2-sel-box-redes-s-wrp-icon"
                  onClick={() => {
                    window.open(youtube, "_blank");
                  }}
                />
              )}
            </div>
            <Button
              className={classes.button}
              style={{ width: "100%", margin: "5px 0 10px 0" }}
              onClick={() =>
                handleContactarButton(
                  dateSelected
                    ? moment(dateSelected).locale("es").format("LL")
                    : null
                )
              }
            >
              <IoLogoWhatsapp
                style={{ fontSize: "14px", marginRight: "5px" }}
              />{" "}
              Contactar
            </Button>
          </div>
          <div className="temp2-sel-box-buttn-mobile">
            <p className="temp2-sel-box-wrp-p-1">Ver disponibilidad:</p>
            <DatePicker
              value={dateSelected}
              onChange={(value) => {
                setDateSelected(value);
              }}
              tileDisabled={({ date }) => {
                let isDisbale = false;
                busyDates.forEach(({ fechaReserva }) => {
                  const completeDate = new Date(fechaReserva);
                  if (completeDate.getTime() === date.getTime())
                    isDisbale = true;
                });

                return isDisbale;
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className={fixBox ? "temp2-sel-box-wrp-fix" : "temp2-sel-box-wrp"}
          style={{ width }}
        >
          <p className="temp2-sel-box-wrp-instruction">
            Información de contacto
          </p>
          <p className="temp2-sel-box-wrp-p-1">Ver disponibilidad:</p>
          <DatePicker
            value={dateSelected}
            onChange={(value) => {
              setDateSelected(value);
            }}
            tileDisabled={({ date }) => {
              let isDisbale = false;
              busyDates.forEach(({ fechaReserva }) => {
                const completeDate = new Date(fechaReserva);
                if (completeDate.getTime() === date.getTime()) isDisbale = true;
              });

              return isDisbale;
            }}
          />
          <Button
            className={classes.button}
            disabled={isPendingValidation}
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={() =>
              handleContactarButton(
                dateSelected
                  ? moment(dateSelected).locale("es").format("LL")
                  : null
              )
            }
          >
            <IoLogoWhatsapp style={{ fontSize: "14px", marginRight: "5px" }} />{" "}
            Enviar mensaje
          </Button>

          {(instagram || facebook || youtube) && (
            <>
              <p className="temp2-sel-box-wrp-name">Redes sociales</p>
              <div className="temp2-sel-box-redes-s-wrp">
                {!!instagram && (
                  <AiFillInstagram
                    className="temp2-sel-box-redes-s-wrp-icon"
                    onClick={() => {
                      window.open(instagram, "_blank");
                    }}
                  />
                )}
                {!!facebook && (
                  <AiFillFacebook
                    className="temp2-sel-box-redes-s-wrp-icon"
                    onClick={() => {
                      window.open(facebook, "_blank");
                    }}
                  />
                )}
                {!!youtube && (
                  <AiFillYoutube
                    className="temp2-sel-box-redes-s-wrp-icon"
                    onClick={() => {
                      window.open(youtube, "_blank");
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

SelectedPackageBox.propTypes = {
  openLogin: PropTypes.func,
  handleContactarButton: PropTypes.func,
  isPendingValidation: PropTypes.bool,
};

SelectedPackageBox.defaultProps = {
  openLogin: () => {},
  handleContactarButton: () => {},
  isPendingValidation: false,
};
