import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowUp } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";

import "./PasoCreatePackages.css";
import Packages from "../../Packages/Packages";
import addButton from "../../../Assets/img/buttonAdd3.webp";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ModalCreatePackage from "./ModalCreatePackage";
import ModalEditPackages from "./ModalEditPackage";
import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../PasoForm";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io/index";
import { FiEdit2 } from "react-icons/fi/index";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import ErrorMsg from "../../ErrorMsg";
import MyCheckbox from "../../formikInputs/MyCheckbox/MyCheckbox";

// TODO: En un futuro leer info real
const testPackages = [
  {
    id: 1,
    name: "Decoración Paw patrol fiesta infantil",
    mainImage:
      "https://www.espaisentits.com/wp-content/uploads/2019/03/fiesta-infantil.alquiler-local.jpg",
    price: 4000,
    allImages: [],
    description: "",
  },
  {
    id: 2,
    name: "Paquete posada navideña todo incluido",
    mainImage:
      "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2018-12/historia-posadas-navidenas.jpg",
    price: 20000,
    allImages: [],
    description: "",
  },
  {
    id: 3,
    name: "Renta terraza 6 horas con mobiliario",
    mainImage:
      "https://img10.naventcdn.com/avisos/18/00/55/59/47/95/720x532/118005041.jpg",
    price: 10000,
    allImages: [],
    description: "",
  },
  {
    id: 4,
    name: "1 hora de música",
    mainImage:
      "https://www.infobae.com/new-resizer/qj5K1QxExm434PJ_0mtYDLOTgHA=/1200x900/filters:format(jpg):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/XO2NNTS5EZGZTKXSN5PJMM3SVE.jpg",
    price: 3000,
    allImages: [],
    description: "",
  },
  {
    id: 5,
    name: "Buffet para 100 personas, 4 platillos a elegir",
    mainImage:
      "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/01/buffet000.jpg",
    price: 15000,
    allImages: [],
    description: "",
  },
];

export default function PasoCreatePackages({
  setStep,
  idAliado,
  isEdition,
  currentPackages,
  isCollapsible,
  isSelected,
  isMainPage,
  setIsSelected,
}) {
  const [openCreatePackageModal, setOpenCreatePackageModal] = useState(false);
  const [openEditPackageModal, setOpenEditPackageModal] = useState(false);
  // const [openEjemplos, setOpenEjemplos] = useState(false);
  const [activeEditPackage, setActiveEditPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [collapse, setCollapse] = useState(!isSelected);
  const changeArrowUp = useMediaQuery("(max-width:700px)");
  const classes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, intetnalo más tarde"
  );

  const handleCloseCreatePackageModal = () => {
    setOpenCreatePackageModal(false);
  };

  const handleCloseEditPackageModal = () => {
    setOpenEditPackageModal(false);
  };

  const onClickEditPackage = (data) => {
    setActiveEditPackage(data);
    setOpenEditPackageModal(true);
  };

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

  useEffect(() => {
    setPackages(currentPackages);
  }, [currentPackages]);

  const changeStepPaquetesVacios = () => {
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/changeStepPaquetesVacios`,
        { idAliado },
        userHeaders()
      )
      .then(() => {
        setStep(8);
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
      });
  };

  return (
    <>
      {/*style={isCollapsible ? { textAlign: "left" } : { marginLeft: "10px" }}*/}
      {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
      <div
        className="wrp-create-packages-afil"
        style={isMainPage ? { marginBottom: "3rem" } : null}
      >
        <ModalCreatePackage
          handleClose={handleCloseCreatePackageModal}
          open={openCreatePackageModal || openEditPackageModal}
          setPackages={setPackages}
          idAliado={idAliado}
          isEdition={isEdition}
          modoEdicion={openEditPackageModal}
          handleCloseEdit={handleCloseEditPackageModal}
          activeEditPackage={activeEditPackage}
          packages={packages}
          setActiveEditPackage={setActiveEditPackage}
        />

        <p
          className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (collapse) setIsSelected(1);
            setCollapse(!collapse);
          }}
        >
          {isCollapsible && (
            <span>
              {!collapse ? (
                <IoIosArrowDown
                  style={{ marginRight: "15px", marginBottom: "5px" }}
                />
              ) : (
                <IoIosArrowForward
                  style={{ marginRight: "15px", marginBottom: "5px" }}
                />
              )}
            </span>
          )}
          Crea tus paquetes
        </p>

        {(!collapse || !isCollapsible) && (
          <>
            <p className="url-txt-instruc2">
              {!isEdition && (
                <span>
                  En este paso podrás crear los paquetes que verán tus futuros
                  clientes y podrán contratar en unos cuantos clicks.
                </span>
              )}{" "}
              Este paso es <b>opcional</b> ya que cobramos un pequeño porcenaje
              de servicio si se contrata el paquete creado por medio de la
              plataforma. Al crear un paquete en planodi estás aceptando su
              funcionamiento y confirmas que has{" "}
              <a
                href="https://outstanding-agate-1fa.notion.site/Paquetes-Planodi-2fa5a81adb98495d980981d959b850f0"
                target="_blank"
                rel="noopener noreferrer"
              >
                leído nuestro blog
              </a>{" "}
              donde explicamos más a detalle su función.
            </p>

            {packages.length ? (
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Da click sobre el paquete para editarlo
              </p>
            ) : null}
            <div className="wrp-packages-afil-container">
              <div
                className="create-package-button"
                onClick={() => setOpenCreatePackageModal(true)}
              >
                <img
                  src={addButton}
                  alt="button"
                  className="create-package-button-img"
                />
                <p className="create-package-button-p">
                  Click aquí para agregar un paquete
                </p>
                <IoIosAddCircleOutline className="create-package-button-icon" />
              </div>
              {packages.length ? (
                packages.map((item) => (
                  <Packages
                    key={item.id}
                    cardInfo={item}
                    onClickFunction={() => onClickEditPackage(item)}
                    onClickVerMas={() => onClickEditPackage(item)}
                    label={
                      <span>
                        <FiEdit2 style={{ margin: "0 5px 5px 0" }} />
                        EDITAR
                      </span>
                    }
                    kindOfPrice={item?.kindOfPrice}
                    // kindOfPrice={item}
                  />
                ))
              ) : (
                <div className="create-package-instructions">
                  <p>
                    {changeArrowUp ? (
                      <HiOutlineArrowUp
                        style={{ fontSize: "1.2rem", marginRight: "5px" }}
                      />
                    ) : (
                      <HiOutlineArrowLeft
                        style={{ fontSize: "1.2rem", marginRight: "5px" }}
                      />
                    )}
                    Da click a este botón para agregar paquetes
                  </p>
                </div>
              )}
            </div>
            {isEdition && isMainPage && (
              <div
                style={{
                  width: "100%",
                  textAlign: mobile ? "center" : "right",
                  marginTop: "3rem",
                }}
              >
                <Button
                  className={classes.cancelButton}
                  style={mobile ? { width: "100%" } : { width: "25%" }}
                  onClick={() => setStep(6)}
                >
                  Regresar
                </Button>

                <Button
                  onClick={() => setStep(8)}
                  className={classes.saveButton}
                  style={
                    mobile
                      ? { width: "100%", marginTop: "1rem" }
                      : { width: "25%", marginLeft: "1rem" }
                  }
                >
                  {packages.length
                    ? "Guardar cambios y continuar"
                    : "Agregar más tarde"}
                </Button>
              </div>
            )}
            {!isEdition && (
              <div
                style={{
                  width: "100%",
                  textAlign: !packages.length ? "right" : "center",
                  marginTop: "3rem",
                }}
              >
                <Button
                  className={classes.cancelButton}
                  style={
                    mobile
                      ? {
                          width: "100%",
                          marginBottom: "1rem",
                        }
                      : {
                          width: "25%",
                          marginRight: "1rem",
                        }
                  }
                  onClick={() => setStep(6)}
                >
                  Regresar
                </Button>

                <Button
                  className={classes.button}
                  style={mobile ? { width: "100%" } : { width: "30%" }}
                  onClick={changeStepPaquetesVacios}
                >
                  {packages.length ? "Continuar" : "Agregar más tarde"}
                </Button>
              </div>
            )}
            {/*<div*/}
            {/*  className="packages-example-box"*/}
            {/*  style={*/}
            {/*    openEjemplos*/}
            {/*      ? { height: "350px" }*/}
            {/*      : { display: "table", height: "70px" }*/}
            {/*  }*/}
            {/*  onClick={*/}
            {/*    openEjemplos*/}
            {/*      ? null*/}
            {/*      : () =>*/}
            {/*          setOpenEjemplos((prevState) => {*/}
            {/*            return !prevState;*/}
            {/*          })*/}
            {/*  }*/}
            {/*>*/}
            {/*  {openEjemplos ? (*/}
            {/*    <>*/}
            {/*      <div*/}
            {/*        className="packages-example-box-button-hidde"*/}
            {/*        onClick={() =>*/}
            {/*          setOpenEjemplos((prevState) => {*/}
            {/*            return !prevState;*/}
            {/*          })*/}
            {/*        }*/}
            {/*      >*/}
            {/*        <p className="packages-example-box-button-hidde-p">*/}
            {/*          Ocultar*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*      <p className="packages-example-box-p">Algunos Ejemplos</p>*/}
            {/*      <p className="packages-example-box-p2">*/}
            {/*        Estos son algunos ejemplos de paquetes para que puedas crear*/}
            {/*        los tuyos. Si da click podrá ver el contenido de cada*/}
            {/*        paquete.*/}
            {/*      </p>*/}
            {/*      <div className="packages-example-box-flex-disappear">*/}
            {/*        <div className="packages-example-box-flex">*/}
            {/*          {testPackages.map((item) => (*/}
            {/*            <div className="packages-ex-box" key={item.id}>*/}
            {/*              <Packages*/}
            {/*                cardInfo={item}*/}
            {/*                onClickFunction={() => {}}*/}
            {/*                onClickVerMas={() => {}}*/}
            {/*              />*/}
            {/*            </div>*/}
            {/*          ))}*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  ) : (*/}
            {/*    <p*/}
            {/*      className="packages-example-box-p"*/}
            {/*      style={{ display: "table-cell", verticalAlign: "middle" }}*/}
            {/*    >*/}
            {/*      Haz click aquí para ver algunos ejemplos*/}
            {/*    </p>*/}
            {/*  )}*/}
            {/*</div>*/}
          </>
        )}
      </div>
    </>
  );
}

PasoCreatePackages.propTypes = {
  setStep: PropTypes.func.isRequired,
  idAliado: PropTypes.number.isRequired,
  setIsSelected: PropTypes.func,
  isEdition: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  isMainPage: PropTypes.bool,
  isSelected: PropTypes.bool,
  currentPackages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      aliado: PropTypes.number,
      price: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      isActive: PropTypes.number,
      allImages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          idPackage: PropTypes.number,
          image: PropTypes.number,
          isActive: PropTypes.number,
          main: PropTypes.number,
          url: PropTypes.string,
        })
      ),
      mainImage: PropTypes.string,
    })
  ),
};

PasoCreatePackages.defaultProps = {
  setIsSelected: () => null,
  isEdition: false,
  isCollapsible: false,
  isSelected: false,
  isMainPage: false,
  currentPackages: [],
};
