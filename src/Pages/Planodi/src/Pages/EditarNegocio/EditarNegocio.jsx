/* eslint-disable react-hooks/exhaustive-deps */
import "./EditarNegocio.css";
import "../../componentes/pasos/PasoUrl/PasoUrl.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlinePencil } from "react-icons/hi";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/es";
import { MdPhotoCamera } from "react-icons/md";

import Loading from "../../componentes/Loading/Loading";
import PasoCategoria from "../../componentes/pasos/PasoCategoria/PasoCategoria";
import PasoInfoGeneral from "../../componentes/pasos/PasoInfoGeneral/PasoInfoGeneral";
import PasoTypeOfEvents from "../../componentes/pasos/PasoTypeOfEvents/PasoTypeOfEvents";
import PasoFAQ from "../../componentes/pasos/PasoFAQ/PasoFAQ";
import Navbar from "../HomePage/Navbar/Navbar";
import { AiFillCaretLeft } from "react-icons/ai";
import PasoCreatePackages from "../../componentes/pasos/PasoPaquetes/PasoCreatePackages";
import PasoImagenes from "../../componentes/pasos/PasoImagenes/PasoImagenes";
import { userHeaders } from "../../Utils/headerSetter";
import EditarReservas from "./EditarReservas/EditarReservas";
import {
  filterImageSize,
  imageCompressorAndFilter,
} from "../../Utils/filterSize";
import EditarRedesSociales from "./EditarRedesSociales/EditarRedesSociales";
import EditarExtras from "./EditarExtras/EditarExtras";
import { precioToNumber } from "../../componentes/pasos/PasoUrl/PasoUrl";
import Popover from "@material-ui/core/Popover";
import EditarVideos from "./EditarVideos/EditarVideos";

moment.locale("es");

const BASIC = "Basica";
const PREMIUM = "Premium";

const menu = [
  "Información general",
  "Paquetes",
  "Imágenes",
  "Agregar Videos",
  "Cuéntanos sobre tu negocio",
  "Tipos de eventos",
  "Preguntas frecuentes",
  "Bloquear fechas",
  "Redes sociales",
  "Extras",
];

const renderStepFormComponent = ({
  userID,
  setStep,
  aliadoInfoGeneral,
  aliadoInfoSecundaria,
  isTerraza,
  selectedOption,
  eventosActivos,
  currentPackages,
  currentImages,
  dateSelected,
  setDateSelected,
  busyDates = [],
  videos,
}) => {
  switch (selectedOption) {
    case 0:
      return (
        <PasoCategoria
          setStep={setStep}
          userID={userID}
          dataPrincipal={aliadoInfoGeneral}
          isEdition
          isTerraza={isTerraza}
        />
      );
    case 1:
      return (
        <PasoCreatePackages
          setStep={setStep}
          idAliado={aliadoInfoGeneral.id}
          isEdition
          currentPackages={currentPackages}
        />
      );
    case 2:
      return (
        <PasoImagenes
          setStep={setStep}
          idAliado={aliadoInfoGeneral.id}
          isEdition
          currentImages={currentImages}
          premium={aliadoInfoGeneral.membresia === 2}
          initialMain={currentImages
            .filter((img) => img.main)[0]
            ?.id.toString()}
        />
      );
    case 3:
      return <EditarVideos idAliado={aliadoInfoGeneral.id} videos={videos} />;
    case 4:
      return (
        <PasoInfoGeneral
          setStep={setStep}
          idAliado={aliadoInfoGeneral.id}
          isTerraza={isTerraza}
          isEdition
          dataSecundaria={aliadoInfoSecundaria}
        />
      );
    case 5:
      return (
        <PasoTypeOfEvents
          setStep={setStep}
          idAliado={aliadoInfoGeneral.id}
          isEdition
          eventosActivos={eventosActivos}
        />
      );
    case 6:
      return (
        <PasoFAQ
          setStep={setStep}
          idAliado={aliadoInfoGeneral.id}
          isTerraza={isTerraza}
          isEdition
          dataSecundaria={aliadoInfoSecundaria}
        />
      );
    case 7:
      return (
        <EditarReservas
          idAliado={aliadoInfoGeneral.id}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          busyDates={busyDates}
          onSave={setStep}
        />
      );
    case 8:
      return (
        <EditarRedesSociales
          idAliado={aliadoInfoGeneral.id}
          instagram={aliadoInfoGeneral.instagram}
          facebook={aliadoInfoGeneral.facebook}
          youtube={aliadoInfoGeneral.youtube}
        />
      );

    case 9:
      return (
        <EditarExtras
          idAliado={aliadoInfoGeneral.id}
          initialPrecio={
            aliadoInfoGeneral.precio
              ? precioToNumber[aliadoInfoGeneral.precio]
              : 5
          }
        />
      );
    default:
      return null;
  }
};

const renderStepForms = ({
  userID,
  setStep,
  aliadoInfoGeneral,
  aliadoInfoSecundaria,
  isTerraza,
  selectedOption,
  setSelectedOption,
  eventosActivos,
  currentPackages,
  currentImages,
  dateSelected,
  setDateSelected,
  busyDates = [],
  videos,
}) => (
  <>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoCategoria
        setStep={setStep}
        userID={userID}
        dataPrincipal={aliadoInfoGeneral}
        isEdition
        isCollapsible
        isSelected={selectedOption === 0}
        setIsSelected={setSelectedOption}
        isTerraza={isTerraza}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoCreatePackages
        setStep={setStep}
        idAliado={aliadoInfoGeneral.id}
        currentPackages={currentPackages}
        isEdition
        isCollapsible
        setIsSelected={setSelectedOption}
        isSelected={selectedOption === 1}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoImagenes
        setStep={setStep}
        idAliado={aliadoInfoGeneral.id}
        isEdition
        currentImages={currentImages}
        premium={aliadoInfoGeneral.membresia === 2}
        isCollapsible
        setIsSelected={setSelectedOption}
        isSelected={selectedOption === 2}
        initialMain={currentImages.filter((img) => img.main)[0].id.toString()}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <EditarVideos
        isCollapsible
        isSelected={selectedOption === 3}
        setIsSelected={setSelectedOption}
        idAliado={aliadoInfoGeneral.id}
        videos={videos}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoInfoGeneral
        setStep={setStep}
        idAliado={aliadoInfoGeneral.id}
        isEdition
        isCollapsible
        setIsSelected={setSelectedOption}
        isSelected={selectedOption === 4}
        isTerraza={isTerraza}
        dataSecundaria={aliadoInfoSecundaria}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoTypeOfEvents
        setStep={setStep}
        idAliado={aliadoInfoGeneral.id}
        isEdition
        isSelected={selectedOption === 5}
        isCollapsible
        setIsSelected={setSelectedOption}
        eventosActivos={eventosActivos}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <PasoFAQ
        setStep={setStep}
        idAliado={aliadoInfoGeneral.id}
        isEdition
        isCollapsible
        setIsSelected={setSelectedOption}
        isSelected={selectedOption === 6}
        isTerraza={isTerraza}
        dataSecundaria={aliadoInfoSecundaria}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <EditarReservas
        idAliado={aliadoInfoGeneral.id}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        busyDates={busyDates}
        isSelected={selectedOption === 7}
        onSave={setStep}
        isCollapsible
        setIsSelected={setSelectedOption}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <EditarRedesSociales
        isCollapsible
        isSelected={selectedOption === 8}
        setIsSelected={setSelectedOption}
        idAliado={aliadoInfoGeneral.id}
        instagram={aliadoInfoGeneral.instagram}
        facebook={aliadoInfoGeneral.facebook}
        youtube={aliadoInfoGeneral.youtube}
      />
    </div>
    <div className="step-mobile-wrapper-ed-nego">
      <EditarExtras
        isCollapsible
        isSelected={selectedOption === 9}
        setIsSelected={setSelectedOption}
        idAliado={aliadoInfoGeneral.id}
        initialPrecio={
          aliadoInfoGeneral.precio
            ? precioToNumber[aliadoInfoGeneral.precio]
            : 5
        }
      />
    </div>
  </>
);

const updateLogo = (handleChange, logoUrl, loadingLogo, pathName, nombre) => {
  return (
    <div
      className="title-ed-nego"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "0",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file-logo"
          type="file"
          name="imagenesLogo"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file-logo" style={{ margin: "0" }}>
          {logoUrl && !loadingLogo ? (
            <div
              style={{ background: `url(${logoUrl})` }}
              className="content-ed-nego-logo-img"
            />
          ) : (
            <div className="content-ed-nego-logo-subir">
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "13px",
                  marginTop: "12px",
                  fontWeight: 400,
                }}
              >
                {loadingLogo ? "Cargando..." : "Subir logo"}
              </p>
            </div>
          )}
          <MdPhotoCamera
            className="content-ed-nego-logo-icon"
            style={
              logoUrl && !loadingLogo ? { bottom: "10px" } : { bottom: "0" }
            }
          />
        </label>
      </div>
      <a
        href={`${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_LINK_FE_LOCAL
            : process.env.REACT_APP_LINK_FE_PROD
        }negocios/${pathName}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ margin: "0" }}
      >
        {nombre}
      </a>
    </div>
  );
};

export default function EditarNegocio() {
  const mobile = useMediaQuery("(max-width:960px)");
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathName } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    parseInt(params?.opcion) <= 9 ? parseInt(params?.opcion) : 0
  );
  const [aliadoInfoGeneral, setAliadoInfoGeneral] = useState(null);
  const [aliadoInfoSecundaria, setAliadoInfoSecundaria] = useState(null);
  const [isTerraza, setIsTerraza] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [eventosActivos, setEventosActivos] = useState([]);
  const [dateSelected, setDateSelected] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [busyDates, setBusyDates] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!stateUser?.userInfo?.isAlly) {
      navigate.push("/afiliarme");
    } else {
      setLoading(true);
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/getAliado?pathUrl=${pathName}`,
          userHeaders(false)
        )
        .then((res) => {
          if (res.data.aliadoInfoGeneral.usuario !== stateUser.userInfo.id) {
            navigate.push("/mis-negocios");
          } else {
            const {
              aliadoInfoGeneral,
              infoSecundaria,
              images,
              videos,
              packages,
              eventosActivos,
              isTerraza,
            } = res.data;
            setVideos(videos);
            setLogoUrl(aliadoInfoGeneral.logoUrl);
            setAliadoInfoGeneral(aliadoInfoGeneral);
            setAliadoInfoSecundaria(infoSecundaria);
            setFotos(images);
            setPaquetes(packages);
            setIsTerraza(isTerraza);
            setEventosActivos(eventosActivos);
            setLoading(false);
          }
        })
        .catch(() => {
          toast.error("Parece que hubo un error al leer tu información!", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (aliadoInfoGeneral?.id) {
      setLoading(true);
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }aliado/getMisReservas?idAliado=${aliadoInfoGeneral.id}`,
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
        .catch((e) => {
          // TODO: Handler del error
          setLoading(false);
        });
    }
  }, [aliadoInfoGeneral?.id]);

  useEffect(() => {
    navigate.push(`?opcion=${selectedOption}`);
  }, [navigate, selectedOption]);

  const handleChange = async (event) => {
    setLoadingLogo(true);
    let filtroSizeRes;
    try {
      filtroSizeRes = await imageCompressorAndFilter(10000000, [
        ...event.target.files,
      ]);
    } catch (e) {
      filtroSizeRes = filterImageSize(10000000, [...event.target.files]);
    }
    let file = filtroSizeRes.filteredImages;
    if (file.length) {
      const base64EncodedMainImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/changeLogo`,
          {
            image: base64EncodedMainImage,
            idAliado: aliadoInfoGeneral.id,
          },
          userHeaders()
        )
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          setLoadingLogo(false);
          console.log("ERROR");
        });
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return !loading ? (
    <div className="main-wrapper-ed-nego">
      <div className="second-wrapper-ed-nego">
        <div style={{ width: "100%", minWidth: "320px" }}>
          <Navbar type="black" shadow />
        </div>

        <div
          style={{
            width: "100%",
            position: "relative",
            minHeight: "400px",
            marginBottom: "5rem",
            marginTop: "2rem",
          }}
        >
          {mobile ? (
            <>
              <div
                className="back-button-ed-neg"
                onClick={() => navigate.push(`/mis-negocios`)}
              >
                <AiFillCaretLeft style={{ marginBottom: "4px" }} /> Regresar
              </div>
              <div style={{ padding: "0 2rem" }}>
                <p className="title-ed-nego">
                  <span>
                    <HiOutlinePencil
                      style={{ marginRight: "15px", marginBottom: "5px" }}
                    />
                  </span>
                  Edición
                </p>
                {updateLogo(
                  handleChange,
                  logoUrl,
                  loadingLogo,
                  pathName,
                  aliadoInfoGeneral.nombre
                )}
                <p style={{ marginTop: "0.6rem" }}>
                  Plan:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {aliadoInfoGeneral.membresia === 2 ? PREMIUM : BASIC}
                  </span>{" "}
                  hasta {/*{moment(aliadoInfoGeneral.fechaAgregado)*/}
                  {/*  .add(1, "year")*/}
                  {/*  .format("DD-MM-YY")}*/}
                  <span onClick={handleClick} className="ed_nego_popover_p">
                    SIEMPRE ∞
                  </span>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <p className="ed_nego_popover">
                      🎉 Gracias por confiar en nosotros desde el inicio, el
                      plan Premium es gratis para tí de por vida.
                    </p>
                  </Popover>
                </p>
              </div>

              {renderStepForms({
                userID: aliadoInfoGeneral.usuario,
                aliadoInfoGeneral,
                aliadoInfoSecundaria,
                setStep: () => {
                  setLoading(true);
                  window.location.reload();
                },
                isTerraza,
                selectedOption,
                setSelectedOption,
                eventosActivos,
                currentPackages: paquetes,
                currentImages: fotos,
                dateSelected,
                setDateSelected,
                busyDates,
                videos,
              })}
            </>
          ) : (
            <div className="grid-wrapper-ed-nego">
              <div className="menu-wrapper-ed-nego">
                <ul className="ul-ed-nego">
                  <div
                    className="back-button-ed-neg"
                    onClick={() => navigate.push(`/mis-negocios`)}
                  >
                    <AiFillCaretLeft style={{ marginBottom: "4px" }} /> Regresar
                  </div>
                  {menu.map((option, index) => (
                    <li
                      style={
                        index === selectedOption
                          ? {
                              fontWeight: "bold",
                              listStyleType: "disc",
                              color: "#8c50ff",
                            }
                          : {}
                      }
                      key={option}
                      onClick={() => setSelectedOption(index)}
                      className="li-ed-nego"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="content-wrapper-ed-nego">
                <div className="title-wrapper-ed-nego">
                  <p className="title-ed-nego" style={{ fontSize: "1.5rem" }}>
                    <span>
                      <HiOutlinePencil style={{ marginRight: "8px" }} />
                    </span>
                    Edición
                  </p>
                  {updateLogo(
                    handleChange,
                    logoUrl,
                    loadingLogo,
                    pathName,
                    aliadoInfoGeneral.nombre
                  )}
                  <p style={{ marginTop: "12px" }}>
                    Plan:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {aliadoInfoGeneral.membresia === 2 ? PREMIUM : BASIC}
                    </span>{" "}
                    hasta {/*{moment(aliadoInfoGeneral.fechaAgregado)*/}
                    {/*  .add(1, "year")*/}
                    {/*  .format("DD-MM-YY")}*/}
                    <span onClick={handleClick} className="ed_nego_popover_p">
                      SIEMPRE ∞
                    </span>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <p className="ed_nego_popover">
                        🎉 Gracias por confiar en nosotros desde el inicio, el
                        plan Premium es gratis para tí de por vida.
                      </p>
                    </Popover>
                  </p>
                </div>

                <div className="steps-wrapper-ed-nego">
                  {renderStepFormComponent({
                    userID: aliadoInfoGeneral.usuario,
                    aliadoInfoGeneral,
                    aliadoInfoSecundaria,
                    setStep: () => {
                      setLoading(true);
                      window.location.reload();
                    },
                    isTerraza,
                    selectedOption,
                    eventosActivos,
                    currentPackages: paquetes,
                    currentImages: fotos,
                    dateSelected,
                    setDateSelected,
                    busyDates,
                    videos,
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading helperText="Cargando..." />
  );
}
