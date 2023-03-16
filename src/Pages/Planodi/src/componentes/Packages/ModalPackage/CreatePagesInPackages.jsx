import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import choiceIcon from "../../../Assets/img/choiceIcon.jpeg";
import serviceIcon from "../../../Assets/img/servicios.webp";

import "./CreatePagesInPackages.css";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import { AiFillCaretLeft } from "react-icons/ai/index";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from "react-number-format";
import AgregarArticulo from "../../AgregarArticulo/AgregarArticulo";
import { BsFillImageFill, BsFillGearFill } from "react-icons/bs";
import { GiWaterBottle } from "react-icons/gi";
import {
  filterImageSize,
  imageCompressorAndFilter,
} from "../../../Utils/filterSize";
import { IoIosAddCircleOutline } from "react-icons/io/index";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";
import { kindOfPricesDiccionario } from "../../pasos/PasoPaquetes/ModalCreatePackage";

export const StaticTiposDePaginasPaquetes = {
  paginaDeOpciones: 1,
  paginaDeExtras: 2,
};

export const botonesMoradoNegroRojo = makeStyles(() => ({
  buttonPurp: {
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: alpha("#8c50ff", 0.95),
    color: "white",
    "&:hover": {
      backgroundColor: alpha("#8c50ff", 0.85),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonBlack: {
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: "white",
    border: "#3b3b3b solid 1px",
    color: "#3b3b3b",
    "&:hover": {
      backgroundColor: alpha("#3b3b3b", 0.1),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonBlackFilled: {
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: "#3b3b3b",
    color: "white",
    "&:hover": {
      backgroundColor: alpha("#3b3b3b", 0.95),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonBlue: {
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: "white",
    border: "#0D3B66 solid 1px",
    color: "#0D3B66",
    "&:hover": {
      backgroundColor: alpha("#0D3B66", 0.1),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonBlueFilled: {
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: "#0D3B66",
    color: "white",
    "&:hover": {
      backgroundColor: alpha("#0D3B66", 0.95),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonDelete: {
    marginTop: "1rem",
    borderRadius: "6px",
    padding: "16px 26px",
    backgroundColor: alpha("#de3636", 1),
    color: "white",
    "&:hover": {
      backgroundColor: alpha("#de3636", 0.9),
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default function CreatePagesInPackages({
  nextPage,
  setPagesOpciones,
  pagesOpciones,
  setPagesExtras,
  pagesExtras,
  modoEdicion,
  setLoading,
  setError,
  setErrorMsg,
  idPaqueteEnEdicion,
  idAliado,
  setScrollTopFlag,
  kindOfPrice,
}) {
  const [pantallaActiva, setPantallaActiva] = useState(0);
  const [loadingImage, setLoadingImage] = useState(false);
  const [kindOfPriceService, setKindOfPriceService] = useState("4");
  const [kindOfPriceOpciones, setKindOfPriceOpciones] = useState("4");
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [submitOpciones, setSubmitOpciones] = useState(false);
  const [submitArticulos, setSubmitArticulos] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);
  const [edit, setEdit] = useState({ edit: false, tipo: null, id: null });
  const [updateExtra, setUpdateExtra] = useState({ edit: false, id: null });

  const [editExtra, setEditExtra] = useState(false);
  const [articulosExtras, setArticulosExtras] = useState([]);

  const [cantidadExtra, setCantidadExtra] = useState("");
  const [imgExtra, setImgExtra] = useState(null);
  const [validationExtra, setValidationExtra] = useState({
    nombre: false,
    precioExtra: false,
    cantidad: false,
    img: false,
  });

  //validacion página de opciones
  const [validation, setValidation] = useState({
    nombre: false,
    descripcion: false,
    opciones: false,
    precioExtra: false,
  });

  // Inputs página de opciones
  const [opcion, setOpcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [optionsToSelect, setOptionsToSelect] = useState(1);
  const [agregarPrecio, setAgregarPrecio] = useState("No");
  const [precioExtra, setPrecioExtra] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState(null);

  const classes = botonesMoradoNegroRojo();
  const mobile = useMediaQuery("(max-width:960px)");

  const resetFieldsOpciones = () => {
    setEdit({ edit: false, tipo: null, id: null });
    setOpcion("");
    setNombre("");
    setDescripcion("");
    setOpciones([]);
    setOptionsToSelect(1);
    setAgregarPrecio("No");
    setPrecioExtra("");
    setKindOfPriceOpciones(kindOfPricesDiccionario.total);
  };
  const resetFieldsExtras = () => {
    setTipoArticulo(null);
    setNombre("");
    setDescripcion("");
    setPrecioExtra("");
    setImgExtra(null);
    setCantidadExtra("");
  };

  const handleSubmitExtras = () => {
    setSubmitArticulos(true);
    let newValidation = validationExtra;
    if (nombre === "") {
      newValidation = { ...newValidation, nombre: true };
      setErrorValidation(true);
    }
    if (precioExtra === "") {
      newValidation = { ...newValidation, precioExtra: true };
      setErrorValidation(true);
    }
    if (cantidadExtra === "") {
      newValidation = { ...newValidation, cantidad: true };
      setErrorValidation(true);
    }
    if (!imgExtra) {
      newValidation = { ...newValidation, img: true };
      setErrorValidation(true);
    }
    setValidationExtra(newValidation);

    let activeError = false;
    Object.keys(newValidation).filter((item) => {
      if (newValidation[item]) {
        activeError = true;
      }
    });

    if (!activeError) {
      if (updateExtra.edit) {
        if (modoEdicion && edit.edit) {
          setLoadingExtra(true);
          axios
            .post(
              `${
                process.env.REACT_APP_ENV === "development"
                  ? process.env.REACT_APP_API_LOCAL
                  : process.env.REACT_APP_API_PROD
              }user/editPagePackage`,
              {
                tipo: StaticTiposDePaginasPaquetes.paginaDeExtras,
                idAliado,
                dataExtras: {
                  extra: articulosExtras
                    .filter((item) => item.id === updateExtra.id)
                    .map((item) => {
                      return {
                        ...item,
                        nombre,
                        descripcion,
                        precioExtra: parseFloat(precioExtra),
                        cantidadExtra: parseInt(cantidadExtra, 10),
                        img: imgExtra,
                        kindOfPrice: parseInt(kindOfPriceService, 10),
                        isArticulo: tipoArticulo,
                      };
                    })[0],
                  updateImg: !/^http/.test(imgExtra),
                },
              },
              userHeaders()
            )
            .then((res) => {
              setArticulosExtras((prevState) => {
                return prevState.map((item) => {
                  if (item.id === updateExtra.id) {
                    return res.data;
                  }
                  return item;
                });
              });
              setPagesExtras((prevState) => {
                return prevState.map((item) => {
                  if (item.id === edit.id) {
                    return {
                      ...item,
                      extras: articulosExtras.map((item2) => {
                        if (item2.id === updateExtra.id) {
                          return res.data;
                        }
                        return item2;
                      }),
                    };
                  }
                  return item;
                });
              });
              resetFieldsExtras();
              setEditExtra(false);
              setLoadingExtra(false);
              setUpdateExtra({ edit: false, id: null });
            })
            .catch((e) => {
              const { response } = e;
              if (response && response.data && response.data.msg) {
                if (response.data.msg) setErrorMsg(response.data.msg);
              }
              setLoadingExtra(false);
              setError(true);
            });
        } else {
          setArticulosExtras((prevState) => {
            return prevState.map((item) => {
              if (item.id === updateExtra.id) {
                return {
                  ...item,
                  nombre,
                  descripcion,
                  precioExtra: parseFloat(precioExtra),
                  cantidadExtra: parseInt(cantidadExtra, 10),
                  img: imgExtra,
                  kindOfPrice: parseInt(kindOfPriceService, 10),
                  isArticulo: tipoArticulo,
                };
              }
              return item;
            });
          });
          resetFieldsExtras();
          setEditExtra(false);
          setUpdateExtra({ edit: false, id: null });
        }
      } else {
        if (modoEdicion && edit.edit) {
          setLoadingExtra(true);
          axios
            .post(
              `${
                process.env.REACT_APP_ENV === "development"
                  ? process.env.REACT_APP_API_LOCAL
                  : process.env.REACT_APP_API_PROD
              }user/newItemExtraPagePackage`,
              {
                idAliado,
                pageId: edit.id,
                extra: {
                  nombre,
                  descripcion,
                  precioExtra: parseFloat(precioExtra),
                  cantidadExtra: parseInt(cantidadExtra, 10),
                  img: imgExtra,
                  kindOfPrice: parseInt(kindOfPriceService, 10),
                  isArticulo: tipoArticulo,
                },
              },
              userHeaders()
            )
            .then((res) => {
              setArticulosExtras([...articulosExtras, res.data]);
              setPagesExtras((prevState) => {
                return prevState.map((item) => {
                  if (item.id === edit.id) {
                    return {
                      ...item,
                      extras: [...articulosExtras, res.data],
                    };
                  }
                  return item;
                });
              });
              resetFieldsExtras();
              setLoadingExtra(false);
              setEditExtra(false);
            })
            .catch((e) => {
              const { response } = e;
              if (response && response.data && response.data.msg) {
                if (response.data.msg) setErrorMsg(response.data.msg);
              }
              setLoadingExtra(false);
              setError(true);
            });
        } else {
          setArticulosExtras((prevState) => {
            const obj = {
              tipo: StaticTiposDePaginasPaquetes.paginaDeExtras,
              id: prevState.length ? prevState[prevState.length - 1].id + 1 : 1,
              nombre,
              descripcion,
              precioExtra: parseFloat(precioExtra),
              cantidadExtra: parseInt(cantidadExtra, 10),
              img: imgExtra,
              kindOfPrice: parseInt(kindOfPriceService, 10),
              isArticulo: tipoArticulo,
            };
            return [...prevState, obj];
          });
          resetFieldsExtras();
          setEditExtra(false);
        }
      }
    }
  };

  const handleSubmitOpciones = () => {
    setSubmitOpciones(true);
    let newValidation = validation;
    if (nombre === "") {
      newValidation = { ...newValidation, nombre: true };
      setErrorValidation(true);
    }
    if (descripcion === "") {
      newValidation = { ...newValidation, descripcion: true };
      setErrorValidation(true);
    }
    if (!opciones.length) {
      newValidation = { ...newValidation, opciones: true };
      setErrorValidation(true);
    }
    if (agregarPrecio === "Si" && precioExtra === "") {
      newValidation = { ...newValidation, precioExtra: true };
      setErrorValidation(true);
    }
    setValidation(newValidation);

    let activeError = false;
    Object.keys(newValidation).filter((item) => {
      if (newValidation[item]) {
        activeError = true;
      }
    });
    if (!activeError) {
      if (edit.edit) {
        if (modoEdicion) {
          setLoading(true);
          axios
            .post(
              `${
                process.env.REACT_APP_ENV === "development"
                  ? process.env.REACT_APP_API_LOCAL
                  : process.env.REACT_APP_API_PROD
              }user/editPagePackage`,
              {
                tipo: StaticTiposDePaginasPaquetes.paginaDeOpciones,
                idAliado,
                dataOpciones: pagesOpciones
                  .filter((item) => item.id === edit.id)
                  .map((item) => {
                    return {
                      ...item,
                      nombre,
                      descripcion,
                      opciones: opciones.join("_"),
                      optionsToSelect,
                      agregarPrecio: agregarPrecio === "Si",
                      precioExtra:
                        agregarPrecio === "Si"
                          ? parseInt(precioExtra, 10)
                          : null,
                      kindOfPrice: parseInt(kindOfPriceOpciones, 10),
                    };
                  })[0],
              },
              userHeaders()
            )
            .then(() => {
              setPagesOpciones((prevState) => {
                return prevState.map((item) => {
                  if (item.id === edit.id) {
                    return {
                      ...item,
                      nombre,
                      descripcion,
                      opciones: opciones.join("_"),
                      optionsToSelect,
                      agregarPrecio: agregarPrecio === "Si",
                      precioExtra:
                        agregarPrecio === "Si"
                          ? parseInt(precioExtra, 10)
                          : null,
                      kindOfPrice: parseInt(kindOfPriceOpciones, 10),
                    };
                  }
                  return item;
                });
              });
              setLoading(false);
            })
            .catch((e) => {
              const { response } = e;
              if (response && response.data && response.data.msg) {
                if (response.data.msg) setErrorMsg(response.data.msg);
              }
              setLoading(false);
              setError(true);
            });
        } else {
          setPagesOpciones((prevState) => {
            return prevState.map((item) => {
              if (item.id === edit.id) {
                return {
                  ...item,
                  nombre,
                  descripcion,
                  opciones: opciones.join("_"),
                  optionsToSelect,
                  agregarPrecio: agregarPrecio === "Si",
                  precioExtra:
                    agregarPrecio === "Si" ? parseInt(precioExtra, 10) : null,
                  kindOfPrice: parseInt(kindOfPriceOpciones, 10),
                };
              }
              return item;
            });
          });
        }
      } else {
        if (modoEdicion) {
          setLoading(true);
          axios
            .post(
              `${
                process.env.REACT_APP_ENV === "development"
                  ? process.env.REACT_APP_API_LOCAL
                  : process.env.REACT_APP_API_PROD
              }user/addPagePackage`,
              {
                id: idPaqueteEnEdicion,
                idAliado,
                tipo: StaticTiposDePaginasPaquetes.paginaDeOpciones,
                dataOpciones: {
                  nombre,
                  descripcion,
                  opciones: opciones.join("_"),
                  optionsToSelect,
                  agregarPrecio: agregarPrecio === "Si",
                  precioExtra:
                    agregarPrecio === "Si" ? parseInt(precioExtra, 10) : null,
                  kindOfPrice: parseInt(kindOfPriceOpciones, 10),
                },
              },
              userHeaders()
            )
            .then((res) => {
              const { idPage } = res.data;
              setPagesOpciones((prevState) => {
                const obj = {
                  tipo: StaticTiposDePaginasPaquetes.paginaDeOpciones,
                  id: idPage,
                  nombre,
                  descripcion,
                  opciones: opciones.join("_"),
                  optionsToSelect,
                  agregarPrecio: agregarPrecio === "Si",
                  precioExtra:
                    agregarPrecio === "Si" ? parseInt(precioExtra, 10) : null,
                  kindOfPrice: parseInt(kindOfPriceOpciones, 10),
                };
                return [...prevState, obj];
              });
              setLoading(false);
            })
            .catch((e) => {
              const { response } = e;
              if (response && response.data && response.data.msg) {
                if (response.data.msg) setErrorMsg(response.data.msg);
              }
              setLoading(false);
              setError(true);
            });
        } else {
          setPagesOpciones((prevState) => {
            const obj = {
              tipo: 1,
              id: prevState.length ? prevState[prevState.length - 1].id + 1 : 1,
              nombre,
              descripcion,
              opciones: opciones.join("_"),
              optionsToSelect,
              agregarPrecio: agregarPrecio === "Si",
              precioExtra:
                agregarPrecio === "Si" ? parseInt(precioExtra, 10) : null,
              kindOfPrice: parseInt(kindOfPriceOpciones, 10),
            };
            return [...prevState, obj];
          });
        }
      }
      resetFieldsOpciones();
      setPantallaActiva(0);
    }
  };

  useEffect(() => {
    if (submitOpciones) {
      let newValidation = validation;
      if (nombre !== "") {
        newValidation = { ...newValidation, nombre: false };
      }
      if (descripcion !== "") {
        newValidation = { ...newValidation, descripcion: false };
      }
      if (opciones.length) {
        newValidation = { ...newValidation, opciones: false };
      }
      if (agregarPrecio === "Si" && precioExtra !== "") {
        newValidation = { ...newValidation, precioExtra: false };
      }
      let activeError = false;
      Object.keys(newValidation).filter((item) => {
        if (newValidation[item]) {
          activeError = true;
        }
      });
      if (!activeError) {
        setErrorValidation(false);
      }
      setValidation(newValidation);
    }

    if (submitArticulos) {
      let newValidation = validationExtra;
      if (nombre !== "") {
        newValidation = { ...newValidation, nombre: false };
      }
      if (descripcion !== "") {
        newValidation = { ...newValidation, descripcion: false };
      }
      if (precioExtra !== "") {
        newValidation = { ...newValidation, precioExtra: false };
      }
      if (cantidadExtra !== "") {
        newValidation = { ...newValidation, cantidad: false };
      }
      if (imgExtra) {
        newValidation = { ...newValidation, img: false };
      }
      let activeError = false;
      Object.keys(newValidation).filter((item) => {
        if (newValidation[item]) {
          activeError = true;
        }
      });
      if (!activeError) {
        setErrorValidation(false);
      }
      setValidationExtra(newValidation);
    }
  }, [nombre, descripcion, opciones, precioExtra, cantidadExtra, imgExtra]);

  const deletePage = () => {
    if (modoEdicion) {
      setLoading(true);
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/deletePackagePage`,
          {
            idPage: edit.id,
            tipo: edit.tipo,
            idAliado,
          },
          userHeaders()
        )
        .then(() => {
          if (edit.tipo === 1) {
            setPagesOpciones((prevState) => {
              return prevState.filter((item) => item.id !== edit.id);
            });
            resetFieldsOpciones();
          } else {
            setArticulosExtras([]);
            setPagesExtras((prevState) => {
              return prevState.filter((item) => item.id !== edit.id);
            });
            resetFieldsExtras();
          }
          setLoading(false);
          setPantallaActiva(0);
        })
        .catch((e) => {
          const { response } = e;
          if (response && response.data && response.data.msg) {
            if (response.data.msg) setErrorMsg(response.data.msg);
          }
          setLoading(false);
          setError(true);
        });
    } else {
      if (edit.tipo === 1) {
        setPagesOpciones((prevState) => {
          return prevState.filter((item) => item.id !== edit.id);
        });
        resetFieldsOpciones();
      } else {
        setArticulosExtras([]);
        setPagesExtras((prevState) => {
          return prevState.filter((item) => item.id !== edit.id);
        });
        resetFieldsExtras();
      }
      setPantallaActiva(0);
    }
  };

  const deleteExtra = () => {
    if (modoEdicion && edit.edit && updateExtra.edit) {
      setLoadingExtra(true);
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/deleteItemExtraPagePackage`,
          {
            extraId: updateExtra.id,
          },
          userHeaders()
        )
        .then(() => {
          setArticulosExtras((prevState) => {
            return prevState.filter((item) => item.id !== updateExtra.id);
          });
          setPagesExtras((prevState) => {
            return prevState.map((item) => {
              if (item.id === edit.id) {
                return {
                  ...item,
                  extras: articulosExtras.filter(
                    (item2) => item2.id !== updateExtra.id
                  ),
                };
              }
              return item;
            });
          });
          resetFieldsExtras();
          setUpdateExtra({ edit: false, id: null });
          setLoadingExtra(false);
          setEditExtra(false);
        })
        .catch((e) => {
          const { response } = e;
          if (response && response.data && response.data.msg) {
            if (response.data.msg) setErrorMsg(response.data.msg);
          }
          setLoadingExtra(false);
          setError(true);
        });
    } else {
      setArticulosExtras((prevState) => {
        return prevState.filter((item) => item.id !== updateExtra.id);
      });
      resetFieldsExtras();
      setUpdateExtra({ edit: false, id: null });
      setEditExtra(false);
    }
  };

  const editPage = (page) => {
    setEdit({ edit: true, tipo: page.tipo, id: page.id });
    if (page.tipo === 1) {
      setNombre(page.nombre);
      setDescripcion(page.descripcion);
      setOpciones(page.opciones.split("_"));
      setOptionsToSelect(page.optionsToSelect);
      setAgregarPrecio(page.agregarPrecio ? "Si" : "No");
      setPrecioExtra(page.agregarPrecio ? `${page.precioExtra}` : "");
      setKindOfPriceOpciones(`${page.kindOfPrice}`);
      setPantallaActiva(1);
    } else {
      setArticulosExtras(page.extras);
      setPantallaActiva(2);
    }
  };

  useEffect(() => {
    setScrollTopFlag((prevState) => {
      return prevState + 1;
    });
  }, [pantallaActiva]);

  const handleSubmitExtraPage = () => {
    if (edit.edit) {
      setPagesExtras((prevState) => {
        return prevState.map((item) => {
          if (item.id === edit.id) {
            return {
              ...item,
              extras: articulosExtras,
            };
          }
          return item;
        });
      });
      setEdit({ edit: false, tipo: null, id: null });
    } else {
      if (modoEdicion) {
        setLoading(true);
        axios
          .post(
            `${
              process.env.REACT_APP_ENV === "development"
                ? process.env.REACT_APP_API_LOCAL
                : process.env.REACT_APP_API_PROD
            }user/addPagePackage`,
            {
              id: idPaqueteEnEdicion,
              tipo: StaticTiposDePaginasPaquetes.paginaDeExtras,
              idAliado,
              dataExtras: {
                extras: articulosExtras,
              },
            },
            userHeaders()
          )
          .then((res) => {
            const { id, extras } = res.data;
            setPagesExtras((prevState) => {
              const obj = {
                tipo: StaticTiposDePaginasPaquetes.paginaDeExtras,
                id,
                nombre: `Extras ${
                  prevState.length ? prevState[prevState.length - 1].id + 1 : 1
                }`,
                extras,
              };
              return [...prevState, obj];
            });
            setLoading(false);
          })
          .catch((e) => {
            const { response } = e;
            if (response && response.data && response.data.msg) {
              if (response.data.msg) setErrorMsg(response.data.msg);
            }
            setLoading(false);
            setError(true);
          });
      } else {
        setPagesExtras((prevState) => {
          const obj = {
            tipo: StaticTiposDePaginasPaquetes.paginaDeExtras,
            id: prevState.length ? prevState[prevState.length - 1].id + 1 : 1,
            nombre: `Extras ${
              prevState.length ? prevState[prevState.length - 1].id + 1 : 1
            }`,
            extras: articulosExtras,
          };
          return [...prevState, obj];
        });
      }
    }
    setArticulosExtras([]);
    setPantallaActiva(0);
  };

  const editArticuloExtra = (articulo) => {
    setNombre(articulo.nombre);
    setDescripcion(articulo.descripcion);
    setCantidadExtra(`${articulo.cantidadExtra}`);
    setImgExtra(articulo.img);
    setPrecioExtra(`${articulo.precioExtra}`);
    setKindOfPriceService(`${articulo.kindOfPrice}`);
    setTipoArticulo(articulo.isArticulo);
    setUpdateExtra({ edit: true, id: articulo.id });
    setEditExtra(true);
  };

  const handleChangeImage = async (event) => {
    setLoadingImage(true);
    let filtroSizeRes;
    try {
      filtroSizeRes = await imageCompressorAndFilter(10000000, [
        ...event.target.files,
      ]);
    } catch (e) {
      filtroSizeRes = filterImageSize(10000000, [...event.target.files]);
    }
    if (filtroSizeRes.filteredImages.length) {
      const [file] = filtroSizeRes.filteredImages;
      const base64EncodedMainImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      setImgExtra(base64EncodedMainImage);
    }
    setLoadingImage(false);
  };

  return (
    <div style={{ width: "100%" }}>
      {(() => {
        switch (pantallaActiva) {
          case 0:
            return (
              <>
                <p className="create-pag-packg-title">
                  {modoEdicion
                    ? "Páginas adicionales"
                    : "Agrega páginas adicionales a tu paquete"}
                </p>
                <p className="create-pag-packg-p">
                  {modoEdicion
                    ? "Edita o agrega nuevas páginas adicionales para tu paquete."
                    : "Agregar estas páginas adicionales ayuda a que los paquetes sean más persoanlizados. También podrás ganar más dinero poniendo artículos extras a la hora de la compra."}
                </p>
                <div className="create-pag-packg-op-flex">
                  <div
                    className="create-pag-packg-option"
                    onClick={() => setPantallaActiva(1)}
                  >
                    <p>CLick para agregar seleccionador de Opciones</p>
                    <img src={choiceIcon} style={{ width: "70px" }} />
                  </div>
                  <div
                    className="create-pag-packg-option"
                    onClick={() => setPantallaActiva(2)}
                  >
                    <p>
                      Click para agregar página de Artículos/Servicios Extras
                    </p>
                    <MdAddShoppingCart
                      style={{ fontSize: "4rem", color: "#3b3b3b" }}
                    />
                  </div>
                </div>
                {!modoEdicion && (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      className={classes.buttonPurp}
                      style={
                        mobile
                          ? { width: "100%", marginTop: "0.8rem" }
                          : { width: "40%", margin: "8px" }
                      }
                      onClick={nextPage}
                    >
                      Continuar
                    </Button>
                  </div>
                )}
                {pagesOpciones.length > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <p style={{ margin: "0" }}>Páginas de opciones creadas:</p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#6d6d6d",
                        margin: "0 0 10px 0",
                      }}
                    >
                      Da click para editar
                    </p>
                    {pagesOpciones.map((item) => (
                      <div
                        className="create-pag-packg-pags-creadas"
                        onClick={() => editPage(item)}
                      >
                        <p>{item.nombre}</p>
                        <p style={{ fontSize: "0.8rem", color: "#626262" }}>
                          Tipo de página: Selección de opciones
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {pagesExtras.length > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <p style={{ margin: "0" }}>
                      Páginas de artículos extras creadas:
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#6d6d6d",
                        margin: "0 0 10px 0",
                      }}
                    >
                      Da click para editar
                    </p>
                    {pagesExtras.map((item, idx) => (
                      <div
                        className="create-pag-packg-pags-creadas"
                        onClick={() => editPage(item)}
                      >
                        <p>Extras {idx + 1}</p>
                        <p style={{ fontSize: "0.8rem", color: "#626262" }}>
                          Tipo de página: Artículos extras
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          case 1:
            return (
              <div>
                <div
                  className="back-button-create-pag-packg"
                  onClick={() => {
                    resetFieldsOpciones();
                    setPantallaActiva(0);
                  }}
                >
                  <AiFillCaretLeft style={{ marginBottom: "4px" }} /> Cancelar y
                  regresar
                </div>
                <p className="create-pag-packg-title">
                  Seleccionador de opciones
                </p>
                <p className="create-pag-packg-p">
                  Deja que tu cliente pueda seleccionar entre una variedad de
                  opciones, haciendo de su paquete una experiencia a la medida.
                </p>

                <FormControl
                  noValidate
                  autoComplete="off"
                  className="create-pag-packg-box-inputs"
                >
                  <div className="create-package-section-div">
                    <p className="create-package-section-div-p">
                      Nombre de la página -{" "}
                      <span style={{ fontWeight: 300 }}>
                        Dile al cliente qué está escogiendo. Ej: Selecciona tus
                        platillos
                      </span>
                    </p>
                  </div>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    style={
                      mobile
                        ? { width: "100%", marginLeft: "7px", marginTop: "8px" }
                        : {
                            width: "50%",
                            marginLeft: "7px",
                            marginTop: "8px",
                          }
                    }
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    value={nombre}
                    helperText={validation.nombre ? "Campo obligatorio." : null}
                    error={validation.nombre}
                  />
                  <div className="create-package-section-div">
                    <p className="create-package-section-div-p">
                      Describe las opciones al cliente -{" "}
                      <span style={{ fontWeight: 300 }}>
                        Platicale al cliente un poco más sobre las opciones que
                        estará viendo en pantalla. Ej: A continuación verás una
                        serie de opciones para tu taquiza, Podrás elegir
                        unicamente 6 de los 10 guisados disponibles.
                      </span>
                    </p>
                  </div>
                  <TextField
                    label="Descripción"
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginLeft: "7px",
                      marginTop: "8px",
                    }}
                    multiline
                    rows={2}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                    value={descripcion}
                    helperText={
                      validation.descripcion ? "Campo obligatorio." : null
                    }
                    error={validation.descripcion}
                  />
                  <div className="create-package-section-div">
                    <p className="create-package-section-div-p">
                      Agrega las opciones -{" "}
                      <span style={{ fontWeight: 300 }}>
                        Escribe la opción y agregala dando click en el botón.
                        Dando click sobre las opciones podrás eliminarlas.
                      </span>
                    </p>
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <TextField
                      label="Opciones"
                      variant="outlined"
                      style={{ width: "50%", marginLeft: "7px" }}
                      onChange={(e) => {
                        setOpcion(e.target.value);
                      }}
                      value={opcion}
                      helperText={
                        validation.opciones
                          ? "Se tiene que agregar por lo menos una opción."
                          : null
                      }
                      error={validation.opciones}
                    />
                    <Button
                      className={classes.buttonPurp}
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        if (opcion !== "") {
                          setOpciones((prevState) => {
                            return [...prevState, opcion];
                          });
                          setOpcion("");
                        }
                      }}
                      disabled={opcion === ""}
                    >
                      Agregar
                    </Button>
                  </div>
                  <div>
                    {opciones.map((item) => (
                      <Chip
                        color="primary"
                        size="small"
                        label={item}
                        onDelete={() => {
                          setOpciones((prevState) => {
                            return prevState.filter((item2) => item2 !== item);
                          });
                        }}
                        onClick={() => {
                          setOpciones((prevState) => {
                            return prevState.filter((item2) => item2 !== item);
                          });
                        }}
                        style={{ marginLeft: "3px" }}
                      />
                    ))}
                  </div>
                  {opciones.length ? (
                    <>
                      <div className="create-pag-packg-vista-prev">
                        <p
                          style={{
                            margin: 0,
                            width: "100%",
                            fontSize: "0.8rem",
                          }}
                        >
                          Así lo verá el cliente:
                        </p>
                        <div style={{ width: "100%" }}>
                          <p className="create-package-section-div-p">
                            {nombre} -{" "}
                            <span style={{ fontWeight: 300 }}>
                              {descripcion}
                            </span>
                          </p>
                        </div>
                        {opciones.map((item) => (
                          <FormControlLabel
                            control={<Checkbox />}
                            label={item}
                          />
                        ))}
                      </div>
                      <div className="create-package-section-div">
                        <p className="create-package-section-div-p">
                          Tienes {opciones.length} opciones en total ¿Cuántas
                          opciones tiene que seleccionar el usuario?
                        </p>
                      </div>
                      <Select
                        value={optionsToSelect}
                        variant="outlined"
                        style={
                          mobile
                            ? { width: "100%" }
                            : { width: "50%", marginLeft: "5px" }
                        }
                        onChange={(e) => {
                          setOptionsToSelect(e.target.value);
                        }}
                      >
                        {opciones.map((item, idx) => (
                          <MenuItem value={idx + 1}>{idx + 1}</MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : null}
                  <div className="create-package-section-div">
                    <p className="create-package-section-div-p">
                      ¿Agregar estas opciones tiene un costo extra? -{" "}
                      <span style={{ fontWeight: 300 }}>
                        Si tiene un costo extra se le sumara al precio final.
                      </span>
                    </p>
                  </div>
                  <RadioGroup
                    aria-label="costo"
                    defaultValue={agregarPrecio}
                    name="radio-buttons-group"
                    onChange={(e) => {
                      setAgregarPrecio(e.target.value);
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        style={{ width: "100px" }}
                      />
                      <FormControlLabel
                        value="Si"
                        control={<Radio />}
                        label="Si"
                        style={{ width: "100px" }}
                      />
                    </div>
                  </RadioGroup>
                  {agregarPrecio === "Si" && (
                    <>
                      <div
                        className="create-package-section-div"
                        style={{ marginTop: "-1rem" }}
                      >
                        <p className="create-package-section-div-p">
                          Ingresa el precio (con IVA)
                        </p>
                      </div>
                      {kindOfPrice === kindOfPricesDiccionario.porPersona && (
                        <RadioGroup
                          name="kindOfPriceOpciones"
                          value={kindOfPriceOpciones}
                          onChange={(e) =>
                            setKindOfPriceOpciones(e.target.value)
                          }
                          row
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Por persona"
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Total"
                          />
                        </RadioGroup>
                      )}
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <TextField
                          variant="outlined"
                          size={"medium"}
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                          style={
                            mobile
                              ? { width: "200px" }
                              : { width: "200px", marginLeft: "5px" }
                          }
                          onChange={(e) => {
                            setPrecioExtra(e.target.value);
                          }}
                          value={precioExtra}
                          helperText={
                            validation.precioExtra ? "Campo obligatorio." : null
                          }
                          error={validation.precioExtra}
                        />
                        <p style={{ marginLeft: "5px" }}>
                          MXN{" "}
                          {kindOfPriceOpciones ===
                            kindOfPricesDiccionario.porPersona && "por persona"}
                        </p>
                      </div>
                    </>
                  )}
                  {errorValidation && (
                    <div style={{ marginTop: "2rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "0.9rem",
                          color: "#e33d3d",
                        }}
                      >
                        *Falta llenar algún campo*
                      </p>
                    </div>
                  )}
                  {edit.edit && (
                    <Button
                      className={classes.buttonDelete}
                      style={mobile ? { width: "100%" } : { width: "200px" }}
                      onClick={deletePage}
                    >
                      Eliminar Página
                    </Button>
                  )}
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Button
                      className={classes.buttonBlack}
                      style={
                        mobile
                          ? { width: "100%" }
                          : { width: "40%", margin: "8px" }
                      }
                      onClick={() => {
                        resetFieldsOpciones();
                        setPantallaActiva(0);
                      }}
                    >
                      Cancelar y regresar
                    </Button>
                    <Button
                      className={classes.buttonPurp}
                      style={
                        mobile
                          ? { width: "100%", marginTop: "0.8rem" }
                          : { width: "40%", margin: "8px" }
                      }
                      onClick={handleSubmitOpciones}
                    >
                      {edit.edit ? "Guardar cambios" : "Guardar"}
                    </Button>
                  </div>
                </FormControl>
              </div>
            );
          case 2:
            return (
              <div>
                {!editExtra && (
                  <div
                    className="back-button-create-pag-packg"
                    onClick={() => {
                      setEdit({ edit: false, tipo: null, id: null });
                      setArticulosExtras([]);
                      setPantallaActiva(0);
                    }}
                  >
                    <AiFillCaretLeft style={{ marginBottom: "4px" }} />{" "}
                    {modoEdicion && edit.edit
                      ? "Regresar"
                      : "Cancelar y regresar"}
                  </div>
                )}
                <p className="create-pag-packg-title">
                  Artículos/Servicios extra
                </p>
                <p className="create-pag-packg-p">
                  Agrega artículos o servicios complementarios opcionales a tu
                  paquete, tus clientes podrán decidir si agregarlos o no. ¡Es
                  tu momento de vender más!
                </p>
                {editExtra ? (
                  tipoArticulo === null ? (
                    <div className="create-pag-articulos-extra-elegir-tipo">
                      <p className="create-pag-articulos-extra-elegir-tipo-p">
                        ¿Qué vas a agregar?
                      </p>
                      <div className="create-pag-packg-op-flex">
                        <div
                          className="create-pag-packg-option"
                          onClick={() => setTipoArticulo(true)}
                          style={{
                            border: "solid #3b3b3b 1px",
                            width: "150px",
                          }}
                        >
                          <p>Artículo</p>
                          <GiWaterBottle
                            style={{ fontSize: "4rem", color: "#484848" }}
                          />
                        </div>
                        <div
                          className="create-pag-packg-option"
                          onClick={() => {
                            setCantidadExtra("1");
                            setTipoArticulo(false);
                          }}
                          style={{
                            border: "solid #3b3b3b 1px",
                            width: "150px",
                          }}
                        >
                          <p>Servicio</p>
                          <img src={serviceIcon} style={{ width: "70px" }} />
                        </div>
                      </div>
                      <Button
                        className={classes.buttonBlackFilled}
                        style={
                          mobile
                            ? { width: "80%" }
                            : { width: "40%", margin: "8px" }
                        }
                        onClick={() => {
                          setEditExtra(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <div className="create-pag-articulos-extra-edit-wrp">
                      {typeof tipoArticulo === "boolean" ? (
                        tipoArticulo ? (
                          <p className="create-pag-articulos-extra-edit-tipo">
                            Artículo Extra
                          </p>
                        ) : (
                          <p className="create-pag-articulos-extra-edit-tipo">
                            Servicio Extra
                          </p>
                        )
                      ) : null}
                      {loadingExtra ? (
                        <div style={{ height: "300px" }}>
                          <Loading helperText="Esto puede tardar unos minutos" />
                        </div>
                      ) : (
                        <>
                          <div className="create-pag-articulos-extra-edit-img">
                            {loadingImage ? (
                              <p style={{ fontSize: "0.8rem" }}>cargando...</p>
                            ) : imgExtra ? (
                              <div className="create-pag-articulos-extra-update-div">
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="contained-button-file-edit-pag"
                                  type="file"
                                  name="imagenesLogo"
                                  onChange={handleChangeImage}
                                />
                                <img
                                  src={imgExtra}
                                  alt="imagen de extra"
                                  style={{ width: "90%" }}
                                />
                                <label
                                  htmlFor="contained-button-file-edit-pag"
                                  className="create-pag-articulos-extra-update-img"
                                >
                                  <p>Cambiar</p>
                                </label>
                              </div>
                            ) : (
                              <>
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="contained-button-file-extra"
                                  type="file"
                                  name="imagenesLogo"
                                  onChange={handleChangeImage}
                                />
                                <label
                                  htmlFor="contained-button-file-extra"
                                  className="create-pag-articulos-extra-add-img"
                                  style={
                                    validationExtra.img
                                      ? { border: "dashed #ff5757 2px" }
                                      : null
                                  }
                                >
                                  <BsFillImageFill
                                    style={{
                                      fontSize: "3rem",
                                    }}
                                  />
                                  <p>Agregar imagen</p>
                                </label>
                              </>
                            )}
                          </div>
                          <div className="create-pag-articulos-extra-edit-form">
                            <FormControl
                              noValidate
                              autoComplete="off"
                              className="create-pag-packg-box-inputs"
                            >
                              <div className="create-package-section-div">
                                <p className="create-package-section-div-p">
                                  Nombre del extra
                                </p>
                              </div>
                              <TextField
                                label="Nombre"
                                variant="outlined"
                                style={
                                  mobile
                                    ? {
                                        width: "100%",
                                        marginTop: "8px",
                                      }
                                    : {
                                        width: "50%",
                                        marginLeft: "7px",
                                        marginTop: "8px",
                                      }
                                }
                                onChange={(e) => {
                                  setNombre(e.target.value);
                                }}
                                value={nombre}
                                helperText={
                                  validationExtra.nombre
                                    ? "Campo obligatorio."
                                    : null
                                }
                                error={validationExtra.nombre}
                              />
                              <div className="create-package-section-div">
                                <p className="create-package-section-div-p">
                                  Precio del extra con IVA
                                </p>
                              </div>
                              {!tipoArticulo &&
                                kindOfPrice ===
                                  kindOfPricesDiccionario.porPersona && (
                                  <RadioGroup
                                    name="kindOfPriceService"
                                    value={kindOfPriceService}
                                    onChange={(e) =>
                                      setKindOfPriceService(e.target.value)
                                    }
                                    row
                                  >
                                    <FormControlLabel
                                      value="1"
                                      control={<Radio />}
                                      label="Por persona"
                                    />
                                    <FormControlLabel
                                      value="4"
                                      control={<Radio />}
                                      label="Total"
                                    />
                                  </RadioGroup>
                                )}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                }}
                              >
                                <TextField
                                  variant="outlined"
                                  size={"medium"}
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  style={
                                    mobile
                                      ? { width: "200px" }
                                      : { width: "200px", marginLeft: "5px" }
                                  }
                                  onChange={(e) => {
                                    setPrecioExtra(e.target.value);
                                  }}
                                  value={precioExtra}
                                  helperText={
                                    validationExtra.precioExtra
                                      ? "Campo obligatorio."
                                      : null
                                  }
                                  error={validationExtra.precioExtra}
                                />
                                <p style={{ marginLeft: "5px" }}>MXN</p>
                              </div>
                              {tipoArticulo && (
                                <>
                                  <div className="create-package-section-div">
                                    <p className="create-package-section-div-p">
                                      Cantidad máxima -{" "}
                                      <span style={{ fontWeight: 300 }}>
                                        El cliente podrá agregar 1, 2, 3 o hasta
                                        la cantidad que tú lo permitas
                                      </span>
                                    </p>
                                  </div>
                                  <TextField
                                    label="Cantidad"
                                    variant="outlined"
                                    style={
                                      mobile
                                        ? {
                                            width: "100%",
                                            marginTop: "8px",
                                          }
                                        : {
                                            width: "50%",
                                            marginLeft: "7px",
                                            marginTop: "8px",
                                          }
                                    }
                                    onChange={(e) => {
                                      if (
                                        !isNaN(parseInt(e.target.value)) ||
                                        e.target.value === ""
                                      ) {
                                        setValidationExtra((prevState) => {
                                          return {
                                            ...prevState,
                                            cantidad: false,
                                          };
                                        });
                                        setCantidadExtra(e.target.value);
                                      } else {
                                        setValidationExtra((prevState) => {
                                          return {
                                            ...prevState,
                                            cantidad: true,
                                          };
                                        });
                                      }
                                    }}
                                    value={cantidadExtra}
                                    helperText={
                                      validationExtra.cantidad
                                        ? "Campo obligatorio. Sólo valores numéricos."
                                        : null
                                    }
                                    error={validationExtra.cantidad}
                                  />
                                </>
                              )}

                              <div className="create-package-section-div">
                                <p className="create-package-section-div-p">
                                  Descripción (opcional) -{" "}
                                  <span style={{ fontWeight: 300 }}>
                                    Platica brevemente sobre este extra, dile al
                                    cliente qué incluye si es necesario.
                                  </span>
                                </p>
                              </div>
                              <TextField
                                label="Descripción"
                                variant="outlined"
                                style={
                                  mobile
                                    ? { width: "100%", marginTop: "8px" }
                                    : {
                                        width: "98%",
                                        marginLeft: "7px",
                                        marginTop: "8px",
                                      }
                                }
                                multiline
                                rows={2}
                                onChange={(e) => {
                                  setDescripcion(e.target.value);
                                }}
                                value={descripcion}
                              />

                              {errorValidation && (
                                <div
                                  style={{
                                    marginTop: "2rem",
                                    textAlign: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: "Roboto, sans-serif",
                                      fontSize: "0.9rem",
                                      color: "#e33d3d",
                                    }}
                                  >
                                    *Falta llenar algún campo*
                                  </p>
                                </div>
                              )}
                              {updateExtra.edit && (
                                <Button
                                  className={classes.buttonDelete}
                                  style={
                                    mobile
                                      ? { width: "100%" }
                                      : { width: "200px" }
                                  }
                                  onClick={deleteExtra}
                                >
                                  Eliminar
                                </Button>
                              )}
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: "2rem",
                                  marginBottom: "2rem",
                                }}
                              >
                                <Button
                                  className={classes.buttonBlack}
                                  style={
                                    mobile
                                      ? { width: "100%" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                  onClick={() => {
                                    resetFieldsExtras();
                                    setUpdateExtra({ edit: false, id: null });
                                    setEditExtra(false);
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  className={classes.buttonPurp}
                                  style={
                                    mobile
                                      ? { width: "100%", marginTop: "0.8rem" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                  onClick={handleSubmitExtras}
                                >
                                  {updateExtra.edit
                                    ? "Guardar cambios"
                                    : "Guardar"}
                                </Button>
                              </div>
                            </FormControl>
                          </div>
                        </>
                      )}
                    </div>
                  )
                ) : (
                  <>
                    <div className="create-pag-articulos-extra-flexbox">
                      {articulosExtras.length ? (
                        <div
                          className="create-pag-articulos-extra-plus"
                          onClick={() => setEditExtra(true)}
                        >
                          <IoIosAddCircleOutline
                            style={{
                              fontSize: "4rem",
                              color: "rgba(59,59,59,0.8)",
                              marginTop: "0.1rem",
                            }}
                            id="ver-mas-home"
                          />
                          <p>Agregar más</p>
                        </div>
                      ) : (
                        <div
                          className="wrp-articulo"
                          style={{
                            border: "dashed #d4d4d4 1px",
                            cursor: "pointer",
                            padding: "6px",
                            width: "180px",
                          }}
                          onClick={() => setEditExtra(true)}
                        >
                          <div className="articulo-foto">
                            <div
                              style={{
                                position: "absolute",
                                left: "50%",
                                top: "60%",
                                transform: "translate(-50%,-50%)",
                                fontSize: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <BsFillImageFill
                                style={{
                                  fontSize: "2rem",
                                }}
                              />
                              <p
                                style={{
                                  fontSize: "0.7rem",
                                }}
                              >
                                Sin imagen
                              </p>
                            </div>
                          </div>
                          <p className="articulo-titulo">Nombre - $00.00</p>
                          <p
                            className="articulo-titulo"
                            style={{ fontSize: "0.8rem" }}
                          >
                            Incluye: ...
                          </p>
                          {/*<div*/}
                          {/*  className="articulo-controlador-wrp"*/}
                          {/*  style={{ pointerEvents: "none" }}*/}
                          {/*>*/}
                          {/*  <div*/}
                          {/*    className="articulo-controlador-wrp-btn"*/}
                          {/*    style={{ color: "#999999" }}*/}
                          {/*  >*/}
                          {/*    -*/}
                          {/*  </div>*/}
                          {/*  <div*/}
                          {/*    style={{*/}
                          {/*      width: "33.4%",*/}
                          {/*      textAlign: "center",*/}
                          {/*      color: "#999999",*/}
                          {/*    }}*/}
                          {/*  >*/}
                          {/*    0*/}
                          {/*  </div>*/}
                          {/*  <div*/}
                          {/*    className="articulo-controlador-wrp-btn"*/}
                          {/*    style={{ color: "#999999" }}*/}
                          {/*  >*/}
                          {/*    +*/}
                          {/*  </div>*/}
                          {/*</div>*/}
                          <div
                            style={{
                              color: "#3b3b3b",
                              textAlign: "center",
                              margin: "9px 0 6px 0",
                            }}
                          >
                            Click para editar
                            <BsFillGearFill />
                          </div>
                        </div>
                      )}
                      {articulosExtras.map((item) => (
                        <AgregarArticulo
                          name={item.nombre}
                          image={item.img}
                          precio={item.precioExtra}
                          cantidad={0}
                          maxCantidad={item.cantidadExtra}
                          description={item.descripcion}
                          edit
                          editArticulo={() => editArticuloExtra(item)}
                          isArticulo={item.isArticulo}
                          precioPorPersona={
                            item.kindOfPrice ===
                            kindOfPricesDiccionario.porPersona
                          }
                        />
                      ))}
                    </div>
                    {edit.edit && (
                      <Button
                        className={classes.buttonDelete}
                        style={mobile ? { width: "100%" } : { width: "200px" }}
                        onClick={deletePage}
                      >
                        Eliminar Página
                      </Button>
                    )}
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <Button
                        className={classes.buttonBlack}
                        style={
                          mobile
                            ? { width: "100%", marginTop: "0.2rem" }
                            : {
                                width: `${
                                  edit.edit && modoEdicion ? "55%" : "40%"
                                }`,
                                margin: "8px",
                              }
                        }
                        onClick={() => {
                          setEdit({ edit: false, tipo: null, id: null });
                          setArticulosExtras([]);
                          setPantallaActiva(0);
                        }}
                      >
                        {edit.edit && modoEdicion
                          ? "Regresar"
                          : "Cancelar y regresar"}
                      </Button>
                      {!(edit.edit && modoEdicion) && (
                        <Button
                          className={classes.buttonPurp}
                          style={
                            mobile
                              ? { width: "100%", marginTop: "0.6rem" }
                              : { width: "40%", margin: "8px" }
                          }
                          disabled={!articulosExtras.length}
                          onClick={handleSubmitExtraPage}
                        >
                          {edit.edit ? "Guardar cambios" : "Guardar Página"}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
        }
      })()}
    </div>
  );
}
