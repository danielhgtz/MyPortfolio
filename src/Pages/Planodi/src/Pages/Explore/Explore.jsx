import React, { useEffect, useRef, useState } from "react";
import "./Explore.css";
import Navbar from "../HomePage/Navbar/Navbar";
import Filtros from "./Filtros/Filtros";
import CardExplore from "../../componentes/CardExplore/CardExplore";
import BuscadorExplore from "./BuscadorExplore/BuscadorExplore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Pagination from "../../componentes/Pagination/Pagination";
import ModalFiltros from "./Filtros/ModalFiltros/ModalFiltros";
import axios from "axios";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DotLoading from "../../componentes/DotLoading/DotLoading";
import { userHeaders } from "../../Utils/headerSetter";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "../../componentes/Hooks/useDidMountEffect";
import ErrorMsg from "../../componentes/ErrorMsg";

const buttonBox = makeStyles(() => ({
  button: {
    backgroundColor: "#0D3B66",
    color: "white",
    fontSize: "0.9rem",
    textTransform: "none",
    padding: "6px 20px",
    "&:hover": {
      backgroundColor: "#124473",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      color: "white",
      backgroundColor: "#ececec",
    },
  },
  button2: {
    backgroundColor: "#ffffff",
    color: "#3b3b3b",
    fontSize: "0.9rem",
    textTransform: "none",
    padding: "6px 20px",
    "&:hover": {
      backgroundColor: "#f5f4f4",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function Explore() {
  const classes = buttonBox();
  const filterTemplate = [
    // {
    //   name: "cargando",
    //   type: filterType.category,
    // },
  ];
  const mobile = useMediaQuery("(max-width:960px)");
  const [filterType, setFilterType] = useState({
    price: 1,
    category: 2,
    eventType: 3,
    other: 4,
  });
  const [filtroCategorias, setFiltroCategorias] = useState(filterTemplate);
  const [filtroTipoEventos, setFiltroTipoEventos] = useState(filterTemplate);
  const [filtrosActivos, setFiltrosActivos] = useState(filterTemplate);
  const [maxPrecio, setMaxPrecio] = useState(100000);
  const [precio, setPrecio] = useState({
    priceRange: [0, maxPrecio],
    name: "$0 - $100,000",
    type: filterType.price,
  });
  const [priceFilterStr, setPriceFilterStr] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cardsPerPageExplore, setCardsPerPageExplore] = useState(10);
  const [loadignMunicipios, setLoadingMunicipios] = useState(true);
  const [showFiltros, setShowFiltros] = useState(true);
  const [fixBuscador, setFixBuscador] = useState(false);
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [fixLocationSelect, setFixLocationSelect] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [activeEstado, setActiveEstado] = useState(-1);
  const [activeMunicipios, setActiveMunicipios] = useState([]);
  const [filterEstado, setFilterEstado] = useState(-1);
  const [filterMunicipios, setFilterMunicipios] = useState([]);

  const [viewedIds, setViewedIds] = useState({});
  const [allViewedIds, setAllViewedIds] = useState([]);

  const [filterMunicipiosStr, setFilterMunicipiosStr] = useState("");
  const [municipiosArrayStr, setMunicipiosArrayStr] = useState([]);
  const [filterEstadoStr, setFilterEstadoStr] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cardInfo, setCardInfo] = useState([]);
  const [cardInfoNoResults, setCardInfoNoResults] = useState(false);
  const [totalResultsStr, setTotalResultsStr] = useState("");
  const [errorMsg, setErrorMsg] = useState("Error - intentalo más tarde");
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleChangePrecioSlider = (event, newValue) => {
    setPrecio((prevState) => {
      return { ...prevState, priceRange: newValue };
    });
  };

  /**
   * @param {{int:[int,int], string: string}} precio
   * @param {{id:number, name: string, status: boolean}} tiposEventos
   * @param {{id:number, name: string, status: boolean}} categorias
   */
  useEffect(() => {
    document.title = "Planodi - Buscador";
    const paramObj = {
      minPr: "",
      maxPr: "",
      category: "",
      event: "",
      free: "",
      cities: "",
      state: "",
    };
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    for (const prop in params) {
      paramObj[prop] = params[prop];
    }
    for (const property in paramObj) {
      if (paramObj[property] === "") {
        delete paramObj[property];
      }
    }
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/getFiltros`
      )
      .then((res) => {
        const { precio, tiposEventos, categorias, filterType, estados } =
          res.data;
        setEstados(estados);
        //Set filtros de precio
        setMaxPrecio(precio.int[1]);
        setPrecio((prevState) => {
          return { ...prevState, priceRange: precio.int };
        });
        // Set filter types
        setFilterType(filterType);
        //Set filtros Categorias
        setFiltroCategorias(
          categorias.map((item) => {
            return { ...item, type: filterType.category };
          })
        );
        //Set filtros Tipo de eventos
        setFiltroTipoEventos(
          tiposEventos.map((item) => {
            return { ...item, type: filterType.eventType };
          })
        );

        //From query string to filter
        const filtersFromQueryString = [];
        for (const property in paramObj) {
          switch (property) {
            case "minPr" || "maxPr":
              const newPriceObj = {
                priceRange: [
                  parseInt(
                    paramObj.minPr
                      ? parseInt(paramObj.minPr, 10) < 0
                        ? "0"
                        : paramObj.minPr
                      : "0",
                    10
                  ),
                  parseInt(
                    paramObj.maxPr
                      ? parseInt(paramObj.maxPr, 10) > precio.int[1]
                        ? `${precio.int[1]}`
                        : paramObj.maxPr
                      : `${precio.int[1]}`,
                    10
                  ),
                ],
                name: `$${parseInt(
                  paramObj.minPr
                    ? parseInt(paramObj.minPr, 10) < 0
                      ? "0"
                      : paramObj.minPr
                    : "0"
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })} - $${parseInt(
                  paramObj.maxPr
                    ? parseInt(paramObj.maxPr, 10) > precio.int[1]
                      ? `${precio.int[1]}`
                      : paramObj.maxPr
                    : `${precio.int[1]}`
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
                type: filterType.price,
              };
              setPrecio(newPriceObj);
              // agregarOQuitarFiltro(true, newPriceObj);
              filtersFromQueryString.push(newPriceObj);
              break;
            case "category":
              const arrIds = paramObj.category
                .split(",")
                .map((item) => parseInt(item, 10));
              arrIds.forEach((idCategory) => {
                if (
                  categorias.filter((item) => item.id === idCategory).length
                ) {
                  // agregarOQuitarFiltro(true, {
                  //   id: idCategory,
                  //   name: categorias.filter((item) => item.id === idCategory)[0]
                  //     .name,
                  //   status: true,
                  //   type: filterType.category,
                  // });
                  filtersFromQueryString.push({
                    id: idCategory,
                    name: categorias.filter((item) => item.id === idCategory)[0]
                      .name,
                    status: true,
                    type: filterType.category,
                  });
                }
              });
              setFiltroCategorias(
                categorias.map((item) => {
                  if (arrIds.includes(item.id)) {
                    return {
                      ...item,
                      type: filterType.category,
                      status: true,
                    };
                  } else {
                    return { ...item, type: filterType.category };
                  }
                })
              );
              break;
            case "event":
              const arrIdsEv = paramObj.event
                .split(",")
                .map((item) => parseInt(item, 10));
              arrIdsEv.forEach((idEvent) => {
                if (tiposEventos.filter((item) => item.id === idEvent).length) {
                  // agregarOQuitarFiltro(true, {
                  //   id: idEvent,
                  //   name: tiposEventos.filter((item) => item.id === idEvent)[0]
                  //     .name,
                  //   status: true,
                  //   type: filterType.eventType,
                  // });
                  filtersFromQueryString.push({
                    id: idEvent,
                    name: tiposEventos.filter((item) => item.id === idEvent)[0]
                      .name,
                    status: true,
                    type: filterType.eventType,
                  });
                }
              });

              setFiltroTipoEventos(
                tiposEventos.map((item) => {
                  if (arrIdsEv.includes(item.id)) {
                    return {
                      ...item,
                      type: filterType.eventType,
                      status: true,
                    };
                  } else {
                    return { ...item, type: filterType.eventType };
                  }
                })
              );

              break;
            case "free":
              paramObj.free.split(",").forEach((valFree) => {
                // agregarOQuitarFiltro(true, {
                //   name: valFree,
                //   type: filterType.other,
                // });
                filtersFromQueryString.push({
                  name: valFree,
                  type: filterType.other,
                });
              });
              break;
            case "state":
              setActiveEstado(parseInt(paramObj.state, 10));
              setFilterEstadoStr(
                estados.filter(
                  (item) =>
                    parseInt(item.id, 10) === parseInt(paramObj.state, 10)
                )[0].estado
              );
              setFilterEstado(parseInt(paramObj.state, 10));
              break;
            case "cities":
              setActiveMunicipios(
                paramObj.cities.split(",").map((item) => parseInt(item))
              );
              setFilterMunicipios(
                paramObj.cities.split(",").map((item) => parseInt(item))
              );
              break;
            default:
              break;
          }
        }
        if (filtersFromQueryString.length) {
          setFiltrosActivos((prevState) => {
            return [...prevState, ...filtersFromQueryString];
          });
        } else {
          setFiltrosActivos((prevState) => {
            return [...prevState];
          });
        }

        // setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setErrorMsg(err.response.data.msg);
        }
        setLoading(false);
        setError(true);
        const myDivExplore = document.getElementById("containerExplore");
        myDivExplore.scrollTop = 0;
      });
  }, []);

  const createQueryString = (isItForRequest) => {
    const paramObj = {
      minPr: "-1",
      maxPr: "-1",
      category: "-1",
      event: "-1",
      free: "-1",
      state: `${activeEstado}`,
      cities: `${activeMunicipios.length ? activeMunicipios.toString() : "-1"}`,
    };
    filtrosActivos.forEach((item) => {
      switch (item.type) {
        case 1:
          paramObj["minPr"] = item.priceRange[0];
          paramObj["maxPr"] = item.priceRange[1];
          break;
        case 2:
          if (paramObj["category"] === "-1") {
            paramObj["category"] = item.id;
            break;
          } else {
            paramObj["category"] = `${paramObj["category"]},${item.id}`;
            break;
          }
        case 3:
          if (paramObj["event"] === "-1") {
            paramObj["event"] = item.id;
            break;
          } else {
            paramObj["event"] = `${paramObj["event"]},${item.id}`;
            break;
          }
        case 4:
          if (paramObj["free"] === "-1") {
            paramObj["free"] = item.name;
            break;
          } else {
            paramObj["free"] = `${paramObj["free"]},${item.name}`;
            break;
          }
        default:
          break;
      }
    });

    if (!isItForRequest) {
      for (const property in paramObj) {
        if (paramObj[property] === "-1") {
          delete paramObj[property];
        }
      }
    }
    return new URLSearchParams(paramObj).toString();
  };

  useDidMountEffect(() => {
    setLoading(true);
    navigate.push(`?${createQueryString(false)}`);
    setPaginaActual(1);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/getCardsExplore?page=0&${createQueryString(
          true
        )}&viewedIds=-1&direction=1&allViewedIds=-1`
      )
      .then((res) => {
        const { infoCardsExplore, totalResults, cardsPerPage } = res.data;
        setCardsPerPageExplore(cardsPerPage);
        setCardInfo(infoCardsExplore);
        setCardInfoNoResults(infoCardsExplore.length === 0);
        const numPages = Math.ceil(totalResults / cardsPerPage);
        setTotalPages(numPages);
        if (totalResults > 10) {
          setTotalResultsStr(`${Math.floor(totalResults / 10) * 10}+`);
        } else {
          setTotalResultsStr(`${totalResults}`);
        }
        setViewedIds({ 1: infoCardsExplore.map((item) => item.id) });
        setAllViewedIds((prevState) => [
          ...infoCardsExplore.map((item) => item.id),
        ]);
        setLoading(false);
        const myDivExplore = document.getElementById("containerExplore");
        myDivExplore.scrollTop = 0;
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          setErrorMsg(response.data.msg);
        }
        setLoading(false);
      });
  }, [filtrosActivos]);

  const updateStateOnDelete = (filter) => {
    switch (filter.type) {
      case filterType.price:
        setPrecio({
          priceRange: [0, maxPrecio],
          name: priceFilterStr,
          type: filterType.price,
        });
        break;
      case filterType.eventType:
        filtroTipoEventos.forEach((item, idx) => {
          if (item.id === filter.id) {
            let newStateTipoEventos = filtroTipoEventos;
            newStateTipoEventos[idx].status = !item.status;
            setFiltroTipoEventos(newStateTipoEventos);
          }
        });
        break;
      case filterType.category:
        filtroCategorias.forEach((item, idx) => {
          if (item.id === filter.id) {
            let newStateCategorias = filtroCategorias;
            newStateCategorias[idx].status = !item.status;
            setFiltroCategorias(newStateCategorias);
          }
        });
        break;
      default:
    }
  };

  const fixBuscadorTop = () => {
    if (window.scrollY >= 70) {
      setFixBuscador(true);
      setFixLocationSelect(true);
    } else {
      setFixBuscador(false);
      setFixLocationSelect(false);
    }
  };

  window.addEventListener("scroll", fixBuscadorTop);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        showLocationSelect
      ) {
        setShowLocationSelect(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, showLocationSelect]);

  const agregarOQuitarFiltro = (addFiltro, filtro) => {
    if (addFiltro) {
      setFiltrosActivos((prevState) => {
        if (filtro.type === filterType.price) {
          const tempFiltrosActivos = prevState.filter(
            (itemFiltro) => itemFiltro.type !== filterType.price
          );
          return [...tempFiltrosActivos, filtro];
        }
        return [...prevState, filtro];
      });
    } else {
      switch (filtro.type) {
        case filterType.price:
          setFiltrosActivos((prevState) => {
            return prevState.filter(
              (itemFiltro) => itemFiltro.type !== filterType.price
            );
          });
          break;
        case filterType.category || filterType.eventType:
          setFiltrosActivos((prevState) => {
            return prevState.filter(
              (itemFiltro) => itemFiltro.id !== filtro.id
            );
          });
          break;
        default:
          setFiltrosActivos((prevState) => {
            return prevState.filter(
              (itemFiltro) => itemFiltro.name !== filtro.name
            );
          });
      }
    }
  };

  const nuevoFiltroPrecio = (e, newPrices) => {
    const newPriceFilterStr = `$${parseInt(newPrices[0]).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    )} - $${parseInt(newPrices[1]).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

    // agregarOQuitarFiltro(false, precio);
    setPriceFilterStr(newPriceFilterStr);
    agregarOQuitarFiltro(true, {
      priceRange: newPrices,
      name: newPriceFilterStr,
      type: filterType.price,
    });
  };

  useDidMountEffect(() => {
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
          if (activeMunicipios.length) {
            const strMunicipios = [];
            activeMunicipios.forEach((munId) => {
              ciudades.forEach((mun) => {
                if (parseInt(mun.id, 10) === munId) {
                  strMunicipios.push(mun.ciudad);
                }
              });
            });
            setMunicipiosArrayStr(strMunicipios);
            setFilterMunicipiosStr(strMunicipios.toString());
          }
          setLoadingMunicipios(false);
        })
        .catch((e) => {
          const { response } = e;
          if (response && response.data && response.data.msg) {
            setErrorMsg(response.data.msg);
          }
          setError(true);
          setLoading(false);
        });
    }
  }, [activeEstado]);

  const selectMunicipio = (municipioId, municipioName) => {
    if (activeMunicipios.includes(municipioId)) {
      setActiveMunicipios(
        activeMunicipios.filter((item) => item !== municipioId)
      );
      setMunicipiosArrayStr(
        municipiosArrayStr.filter((item) => item !== municipioName)
      );
    } else {
      setActiveMunicipios([...activeMunicipios, municipioId]);
      setMunicipiosArrayStr([...municipiosArrayStr, municipioName]);
    }
  };

  const locationFilter = () => {
    setShowLocationSelect(false);
    setLoading(true);
    setPaginaActual(1);
    setFilterMunicipiosStr(municipiosArrayStr.toString());
    setFilterEstadoStr(
      estados.filter((item) => parseInt(item.id, 10) === activeEstado)[0].estado
    );
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/getCardsExplore?page=0&${createQueryString(
          true
        )}&viewedIds=-1&direction=1&allViewedIds=-1`
      )
      .then((res) => {
        const { infoCardsExplore, totalResults, cardsPerPage } = res.data;
        setCardsPerPageExplore(cardsPerPage);
        setCardInfo(infoCardsExplore);
        setCardInfoNoResults(infoCardsExplore.length === 0);
        const numPages = Math.ceil(totalResults / cardsPerPage);
        setTotalPages(numPages);
        if (totalResults > 10) {
          setTotalResultsStr(`${Math.floor(totalResults / 10) * 10}+`);
        } else {
          setTotalResultsStr(`${totalResults}`);
        }
        setViewedIds({ 1: infoCardsExplore.map((item) => item.id) });
        setAllViewedIds((prevState) => [
          ...infoCardsExplore.map((item) => item.id),
        ]);
        navigate.push(`?${createQueryString(false)}`);
        setLoading(false);
        const myDivExplore = document.getElementById("containerExplore");
        myDivExplore.scrollTop = 0;
      })
      .catch(() => {
        setLoading(false);
      });
    setFilterEstado(activeEstado);
    setFilterMunicipios(activeMunicipios);
  };

  const changePage = (newpage) => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/getCardsExplore?page=${newpage - 1}&${createQueryString(
          true
        )}&viewedIds=${
          newpage in viewedIds ? viewedIds[newpage].toString() : "-1"
        }&direction=${newpage in viewedIds ? "-1" : "1"}&allViewedIds=${
          allViewedIds.length ? allViewedIds.toString() : "-1"
        }`
      )
      .then((res) => {
        const { infoCardsExplore } = res.data;
        setCardInfo(infoCardsExplore);
        setCardInfoNoResults(infoCardsExplore.length === 0);
        if (!(newpage in viewedIds)) {
          const newViewedIds = viewedIds;
          newViewedIds[newpage] = infoCardsExplore.map((item) => item.id);
          setViewedIds(newViewedIds);

          setAllViewedIds((prevState) => [
            ...prevState,
            ...infoCardsExplore.map((item) => item.id),
          ]);
        }
        setLoading(false);
        const myDivExplore = document.getElementById("containerExplore");
        myDivExplore.scrollTop = 0;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div id="containerExplore">
      {mobile && openModal ? (
        <ModalFiltros
          active={openModal}
          setOpenModal={setOpenModal}
          loading={loading}
          precio={precio}
          maxPrecio={maxPrecio}
          handleChangePrecioSlider={handleChangePrecioSlider}
          nuevoFiltroPrecio={nuevoFiltroPrecio}
          agregarOQuitarFiltro={agregarOQuitarFiltro}
          filtroCategorias={filtroCategorias}
          filtroTipoEventos={filtroTipoEventos}
          setFiltroTipoEventos={setFiltroTipoEventos}
          setFiltroCategorias={setFiltroCategorias}
        />
      ) : (
        <div className="wrapper-explore">
          {showLocationSelect ? (
            <div
              className={
                fixLocationSelect
                  ? "explore-box-location-wrp-fixed"
                  : "explore-box-location-wrp"
              }
              ref={wrapperRef}
            >
              <div
                style={
                  activeEstado !== -1
                    ? mobile
                      ? { width: "50%" }
                      : { width: "70%" }
                    : { width: "100%" }
                }
                className="explore-box-loc-div"
              >
                <p className="explore-box-loc-div-title">
                  Selecciona un estado
                </p>
                {estados.map((estado) => (
                  <div
                    key={estado.id}
                    className="explore-box-loc-div-2"
                    onClick={() => {
                      setActiveMunicipios([]);
                      setActiveEstado(parseInt(estado.id, 10));
                    }}
                  >
                    <p
                      className={`${
                        activeEstado === parseInt(estado.id, 10)
                          ? "active"
                          : null
                      } explore-box-loc-div-p`}
                    >
                      {estado.estado}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={
                  activeEstado !== -1
                    ? mobile
                      ? { width: "50%" }
                      : { width: "30%" }
                    : { display: "none" }
                }
                className="explore-box-loc-div-mun"
              >
                <p
                  className="explore-box-loc-div-title"
                  style={{ fontWeight: 400, color: "#8a8a8a" }}
                >
                  Selecciona una o más ciudades{" "}
                  <span style={{ fontWeight: 600, color: "#3b3b3b" }}>
                    (opcional)
                  </span>
                </p>
                {loadignMunicipios ? (
                  <DotLoading />
                ) : (
                  municipios.map((municipio) => (
                    <div
                      key={municipio.id}
                      className="explore-box-loc-div-3"
                      onClick={() =>
                        selectMunicipio(municipio.id, municipio.ciudad)
                      }
                    >
                      <p
                        className={`${
                          activeMunicipios.includes(municipio.id)
                            ? "active"
                            : null
                        } explore-box-loc-div-p`}
                      >
                        {municipio.ciudad}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="explore-box-loc-div-confirm">
                <Button
                  className={classes.button2}
                  style={{
                    width: "80px",
                    position: "absolute",
                    top: "50%",
                    right: "120px",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => {
                    setActiveEstado(filterEstado);
                    setActiveMunicipios(filterMunicipios);
                    setShowLocationSelect(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className={classes.button}
                  style={{
                    width: "80px",
                    position: "absolute",
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                  }}
                  disabled={activeEstado === -1}
                  onClick={locationFilter}
                >
                  Guardar
                </Button>
              </div>
            </div>
          ) : null}
          <Navbar type="black" />
          <div className="flex-wrp-explore">
            <div
              className={
                fixBuscador
                  ? "explore-buscador-filtrosActivos-top"
                  : "explore-buscador-filtrosActivos"
              }
            >
              <BuscadorExplore
                filtrosActivos={filtrosActivos}
                showFiltros={showFiltros}
                setShowFiltros={setShowFiltros}
                filterType={filterType}
                agregarOQuitarFiltro={agregarOQuitarFiltro}
                updateStateOnDelete={updateStateOnDelete}
                showLocationSelect={showLocationSelect}
                setShowLocationSelect={setShowLocationSelect}
                estadoFilter={filterEstadoStr}
                municipiosFilter={filterMunicipiosStr}
              />
            </div>
            <div
              className={
                showFiltros || mobile
                  ? fixBuscador
                    ? "filter-sect-expl-top"
                    : "filter-sect-expl"
                  : "filter-sect-expl-desactivados"
              }
            >
              <Filtros
                loading={loading}
                filtrosActivos={filtrosActivos}
                setOpenModal={setOpenModal}
                precio={precio}
                maxPrecio={maxPrecio}
                handleChangePrecioSlider={handleChangePrecioSlider}
                nuevoFiltroPrecio={nuevoFiltroPrecio}
                agregarOQuitarFiltro={agregarOQuitarFiltro}
                updateStateOnDelete={updateStateOnDelete}
                filtroCategorias={filtroCategorias}
                filtroTipoEventos={filtroTipoEventos}
                setFiltroTipoEventos={setFiltroTipoEventos}
                setFiltroCategorias={setFiltroCategorias}
              />
            </div>
            <div
              className={`${
                showFiltros || mobile
                  ? "results-card-explore"
                  : "results-card-explore-filtros-desactivados"
              } ${fixBuscador ? "results-card-explore-top" : null}`}
            >
              {error ? (
                <ErrorMsg setError={setError} errorMsg={errorMsg} />
              ) : loading ? (
                <DotLoading />
              ) : (
                <>
                  <p className="result-number-exp-p">
                    {totalResultsStr} resultados
                    {filtrosActivos.length ||
                    activeEstado !== -1 ||
                    activeMunicipios.length ? (
                      <span
                        className="result-number-exp-p"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          navigate.push("/buscador");
                          window.location.reload();
                        }}
                      >
                        limpiar filtros
                      </span>
                    ) : null}
                  </p>
                  {cardInfo.map((card) => (
                    <CardExplore
                      showFiltros={showFiltros}
                      cardInfo={card}
                      key={card.id}
                    />
                  ))}
                  {!cardInfoNoResults ? (
                    <Pagination
                      numPaginas={totalPages}
                      paginaActual={paginaActual}
                      setPaginaActual={setPaginaActual}
                      changePage={changePage}
                    />
                  ) : (
                    <>
                      <p
                        className="results-cards-no-results"
                        style={{ marginTop: "4rem" }}
                      >
                        No se encontraron resultados con estos filtros :(
                      </p>
                      <p className="results-cards-no-results">
                        Prueba usando menos filtros
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
