import React, { useEffect, useRef, useState } from "react";
import "./BuscadorInicio.css";
import Grid from "@material-ui/core/Grid";
import { GiPartyFlags, GiPartyPopper, GiHairStrands } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { IoLocationOutline, IoRestaurantOutline } from "react-icons/io5";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FiCamera, FiMail } from "react-icons/fi";
import { CgDice6 } from "react-icons/cg";
import { MdRoomService } from "react-icons/md";
import { FaCandyCane, FaChair } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiCake2Line } from "react-icons/ri";

import { useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DotLoading from "../../../componentes/DotLoading/DotLoading";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import useDidMountEffect from "../../../componentes/Hooks/useDidMountEffect";

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "0 0 10px 10px",
    width: "100%",
    color: "white",
  },
  buttonDesktop: {
    borderRadius: "99px",
    color: "white",
    textTransform: "none",
    fontWeight: 400,
    height: "3rem",
    padding: "0 1rem",
    "&:hover": {
      opacity: "0.9",
    },
  },
}));

const iconCategory = {
  0: <IoRestaurantOutline />,
  1: <BiDrink />,
  2: <IoLocationOutline />,
  3: <BsMusicNoteBeamed />,
  4: <FiCamera />,
  5: <FaChair />,
  6: <CgDice6 />,
  7: <GiPartyFlags />,
  8: <FaRegAddressBook />,
  9: <MdRoomService />,
  10: <FiMail />,
  11: <FaCandyCane />,
  12: <RiCake2Line />,
  13: <GiPartyPopper />,
  14: <GiHairStrands />,
};

export default function BuscadorInicio({ estados, categorias, loading }) {
  const mobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();

  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [showQueBuscasSelect, setShowQueBuscasSelect] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [activeEstado, setActiveEstado] = useState(-1);
  const [activeEstadoStr, setActiveEstadoStr] = useState("");
  const [activeMunicipio, setActiveMunicipio] = useState(-1);
  const [activeMunicipioStr, setActiveMunicipioStr] = useState("");
  const [loadignMunicipios, setLoadingMunicipios] = useState(true);
  const [filteredEstados, setFilteredEstados] = useState([]);
  const [inputDonde, setInputDonde] = useState("");

  const [inputQueBuscas, setInputQueBuscas] = useState("");
  const [activeCategoria, setActiveCategoria] = useState(-1);

  const wrapperRefDonde = useRef(null);
  const dondeRef = useRef(null);
  const wrapperRefQue = useRef(null);
  const queRef = useRef(null);

  useDidMountEffect(() => {
    setFilteredEstados(estados);
  }, [estados]);

  const selectMunicipio = (municipioId, municipioName) => {
    if (activeMunicipio === municipioId) {
      setActiveMunicipio(-1);
      setActiveMunicipioStr("");
    } else {
      setActiveMunicipio(municipioId);
      setActiveMunicipioStr(municipioName);
      setInputDonde(`${activeEstadoStr}, ${municipioName}`);
      setShowLocationSelect(false);
    }
  };

  useEffect(() => {
    setLoadingMunicipios(true);
    if (activeEstado !== -1) {
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }aliado/getCiudades?idEstado=${activeEstado}`,
          userHeaders(false)
        )
        .then((res) => {
          const { ciudades } = res.data;
          setMunicipios(ciudades);
          setLoadingMunicipios(false);
          const myDiv = document.getElementById("containerDiv");
          myDiv.scrollTop = 0;
        })
        .catch(() => {
          // TODO: Handler del error
        });
    }
  }, [activeEstado]);

  const handleChangeDonde = (value) => {
    setInputDonde(value);
    if (activeEstado !== -1) {
      setActiveMunicipio(-1);
      setActiveEstado(-1);
    }
    const busquedaSinAcentosMinusculas = value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const filtroRes = estados.filter((item) => {
      const estadoSinAcentosMinusculas = item.estado
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      return (
        estadoSinAcentosMinusculas.indexOf(busquedaSinAcentosMinusculas) === 0
      );
    });
    setFilteredEstados(filtroRes);
  };

  const handleChangeQueBuscas = (value) => {
    setInputQueBuscas(value);
    setShowQueBuscasSelect(false);
    setActiveCategoria(-1);
    if (value === "") {
      setShowQueBuscasSelect(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRefDonde.current &&
        !wrapperRefDonde.current.contains(event.target) &&
        dondeRef.current &&
        !dondeRef.current.contains(event.target)
      ) {
        setShowLocationSelect(false);
      }

      if (
        wrapperRefQue.current &&
        !wrapperRefQue.current.contains(event.target) &&
        queRef.current &&
        !queRef.current.contains(event.target)
      ) {
        setShowQueBuscasSelect(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRefDonde, dondeRef, wrapperRefQue, queRef]);

  const createQueryString = () => {
    const paramObj = {
      category: `${activeCategoria}`,
      state: `${activeEstado}`,
      cities: `${activeMunicipio}`,
      free: `${inputQueBuscas}`,
    };

    for (const property in paramObj) {
      if (paramObj[property] === "-1") {
        delete paramObj[property];
      }
    }
    categorias.forEach((categoria) => {
      if (categoria.name === paramObj.free) {
        delete paramObj.free;
      }
    });
    return new URLSearchParams(paramObj).toString();
  };

  return (
    <div className="inicio-BG">
      {showQueBuscasSelect && !loading && (
        <div className="homepage-box-quebuscas-wrp" ref={wrapperRefQue}>
          <div style={{ width: "100%" }} className="homepage-box-quebuscas-div">
            {categorias.map((categoria, idx) => (
              <div
                key={categoria.id}
                className="homepage-box-loc-div-2"
                onClick={() => {
                  if (categoria.id === activeCategoria) {
                    setActiveCategoria(-1);
                    setInputQueBuscas("");
                  } else {
                    setActiveCategoria(categoria.id);
                    setInputQueBuscas(categoria.name);
                    setShowQueBuscasSelect(false);
                  }
                }}
                style={{ width: "100%" }}
              >
                <p
                  className={`${
                    activeCategoria === categoria.id ? "active" : null
                  } homepage-box-quebuscas-div-p`}
                >
                  <span style={{ marginRight: "5px" }}>
                    {iconCategory[idx]}
                  </span>{" "}
                  {categoria.name}
                </p>
              </div>
            ))}
          </div>
          <div className="horizontal-overflow-blur-white" />
        </div>
      )}
      {showLocationSelect && !loading && (
        <div className="homepage-box-location-wrp" ref={wrapperRefDonde}>
          <div
            style={{ width: "100%" }}
            className="homepage-box-loc-div"
            id="containerDiv"
          >
            <p className="homepage-box-loc-div-title">Selecciona un estado</p>
            {filteredEstados.map((estado) => (
              <div
                key={estado.id}
                className="homepage-box-loc-div-2"
                id={`${estado.id}lol`}
                onClick={() => {
                  if (activeEstado === estado.id) {
                    setActiveEstado(-1);
                    setInputDonde("");
                    setActiveMunicipio(-1);
                    setActiveMunicipioStr("");
                    setActiveEstadoStr("");
                  } else {
                    // desactivado por ahora
                    // setActiveMunicipio(-1);
                    // setActiveMunicipioStr("");
                    setActiveEstado(estado.id);
                    setActiveEstadoStr(estado.estado);
                    setInputDonde(estado.estado);
                    setShowLocationSelect(false);
                  }
                }}
                style={mobile ? { width: "100%" } : { width: "50%" }}
              >
                <p
                  className={`${
                    activeEstado === estado.id ? "active" : null
                  } homepage-box-loc-div-p`}
                >
                  {estado.estado}
                </p>
              </div>
            ))}
          </div>
          {/*<div*/}
          {/*  style={activeEstado !== -1 ? { width: "50%" } : { display: "none" }}*/}
          {/*  className="homepage-box-loc-div-mun"*/}
          {/*>*/}
          {/*  <p className="homepage-box-loc-div-title">*/}
          {/*    Selecciona un municipio{" "}*/}
          {/*    <span style={{ fontWeight: 600, color: "#a2a2a2" }}>*/}
          {/*      (opcional)*/}
          {/*    </span>*/}
          {/*  </p>*/}
          {/*  {loadignMunicipios ? (*/}
          {/*    <DotLoading />*/}
          {/*  ) : (*/}
          {/*    municipios.map((municipio) => (*/}
          {/*      <div*/}
          {/*        key={municipio.id}*/}
          {/*        className="homepage-box-loc-div-3"*/}
          {/*        onClick={() =>*/}
          {/*          selectMunicipio(municipio.id, municipio.ciudad)*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <p*/}
          {/*          className={`${*/}
          {/*            activeMunicipio === municipio.id ? "active" : null*/}
          {/*          } homepage-box-loc-div-p`}*/}
          {/*        >*/}
          {/*          {municipio.ciudad}*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    ))*/}
          {/*  )}*/}
          {/*</div>*/}
          {/*{mobile ? (*/}
          {/*  <div className="homepage-box-loc-div-search">*/}
          {/*    <Button*/}
          {/*      className={`inicio-boton-go ${classes.button}`}*/}
          {/*      href={`${*/}
          {/*        process.env.REACT_APP_ENV === "development"*/}
          {/*          ? process.env.REACT_APP_LINK_FE_LOCAL*/}
          {/*          : process.env.REACT_APP_LINK_FE_PROD*/}
          {/*      }buscador?${createQueryString()}`}*/}
          {/*    >*/}
          {/*      Buscar*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*) : null}*/}
        </div>
      )}
      <h1 className="inicio-titulo">Festeja como te gusta</h1>
      <h2 className="inicio-desc">
        Encuentra los mejores proveedores y terrazas de México para tus eventos
      </h2>
      <div className="home-page-image-bg">
        <div className="home-page-image-color" />
        <div className="inicio-buscadorBox">
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              style={{ position: "relative" }}
              ref={queRef}
            >
              <input
                type="text"
                name="queBuscas"
                autoComplete="off"
                className="inicio-input-1"
                placeholder=" "
                onFocus={() => setShowQueBuscasSelect(true)}
                value={inputQueBuscas}
                onChange={(e) => handleChangeQueBuscas(e.target.value)}
              />
              <label htmlFor="queBuscas" className="inicio-label">
                <span className="inicio-content">¿Qué buscas?</span>
              </label>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              style={{ position: "relative" }}
              ref={dondeRef}
            >
              <input
                type="text"
                name="donde"
                autoComplete="off"
                className="inicio-input-2"
                placeholder=" "
                onFocus={() => setShowLocationSelect(true)}
                value={inputDonde}
                onChange={(e) => handleChangeDonde(e.target.value)}
              />
              <label htmlFor="donde" className="inicio-label">
                <span className="inicio-content">¿Dónde?</span>
              </label>
            </Grid>
            <Grid item xs={12} sm={12} md={2} style={{ position: "relative" }}>
              {mobile ? (
                <Button
                  className={`inicio-boton-go ${classes.button}`}
                  href={`${
                    process.env.REACT_APP_ENV === "development"
                      ? process.env.REACT_APP_LINK_FE_LOCAL
                      : process.env.REACT_APP_LINK_FE_PROD
                  }buscador?${createQueryString()}`}
                >
                  Buscar
                </Button>
              ) : (
                <Button
                  className={`inicio-boton-go ${classes.buttonDesktop}`}
                  href={`${
                    process.env.REACT_APP_ENV === "development"
                      ? process.env.REACT_APP_LINK_FE_LOCAL
                      : process.env.REACT_APP_LINK_FE_PROD
                  }buscador?${createQueryString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buscar
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
