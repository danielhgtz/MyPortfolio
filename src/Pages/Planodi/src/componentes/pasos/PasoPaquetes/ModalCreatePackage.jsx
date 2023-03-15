import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { fade } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import "./PasoCreatePackages.css";
import MyTextField from "../../formikInputs/MyTextField/MyTextField";
import { userHeaders } from "../../../Utils/headerSetter";
import MyLongText from "../../formikInputs/MyLongText/MyLongText";
import MyMoneyInput from "../../formikInputs/MyMoneyInput/MyMoneyInput";
import PublishIcon from "@material-ui/icons/Publish";
import {
  filterImageSize,
  imageCompressorAndFilter,
} from "../../../Utils/filterSize";
import ClearIcon from "@material-ui/icons/Clear";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Loading from "../../Loading/Loading";
import DotLoading from "../../DotLoading/DotLoading";
import MyRadio from "../../formikInputs/MyRadio/MyRadio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import CreatePagesInPackages, {
  botonesMoradoNegroRojo,
} from "../../Packages/ModalPackage/CreatePagesInPackages";
import { AiFillDelete } from "react-icons/ai/index";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export const kindOfPrices = {
  1: "Por persona (incluye IVA)",
  2: "Por hora (incluye IVA)",
  3: "Por artículo (incluye IVA)",
  4: "Total (incluye IVA)",
};
export const kindOfPricesDiccionario = {
  porPersona: "1",
  porHora: "2",
  porArticulo: "3",
  total: "4",
};

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "10px",
    fontSize: "1rem",
    backgroundColor: "#8c50ff",
    color: "white",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: fade("#8c50ff", 0.9),
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  tabsSinFocus: {
    color: "red",
    "&:hover": {
      outline: "none",
    },
  },
}));

export default function ModalCreatePackage({
  handleClose,
  open,
  setPackages,
  idAliado,
  isEdition,
  modoEdicion,
  handleCloseEdit,
  activeEditPackage,
  packages,
  setActiveEditPackage,
}) {
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [stepForm, setStepForm] = useState(1);
  const [lastStep, setLastStep] = useState(1);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido. Por favor contáctanos."
  );
  const [imagenes, setImagenes] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [imagenesPreviewUrl, setImagenesPreviewUrl] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [pagesOpciones, setPagesOpciones] = useState([]);
  const [pagesExtras, setPagesExtras] = useState([]);
  const [scrollTopFlag, setScrollTopFlag] = useState(0);

  const [mainImage, setMainImage] = useState("");
  const [dias, setDias] = useState({
    Lu: false,
    Ma: false,
    Mi: false,
    Ju: false,
    Vi: false,
    Sa: false,
    Do: false,
  });

  const classes = useStyles();
  const classesBotones = botonesMoradoNegroRojo();
  const botones = botonesMoradoNegroRojo();
  const mobile = useMediaQuery("(max-width:960px)");
  const mobileFullScreen = useMediaQuery("(max-width:560px)");

  useEffect(() => {
    if (modoEdicion) {
      setDias({
        Lu: activeEditPackage?.lu === 1,
        Ma: activeEditPackage?.ma === 1,
        Mi: activeEditPackage?.mi === 1,
        Ju: activeEditPackage?.ju === 1,
        Vi: activeEditPackage?.vi === 1,
        Sa: activeEditPackage?.sa === 1,
        Do: activeEditPackage?.do === 1,
      });
      setPagesOpciones(activeEditPackage.pagesOpciones);
      setPagesExtras(activeEditPackage.pagesExtras);
      // setImagesUrl(activeEditPackage.multimedia);
      const main = activeEditPackage.allImages
        .filter((item) => item.main)
        .map((item) => {
          return item.url;
        });
      setMainImage(main[0]);
      setImagesUrl(
        activeEditPackage.allImages.map((item) => {
          return item.url;
        })
      );
    }
  }, [activeEditPackage]);

  const validationSchema = yup.object({
    capacidad: yup
      .number()
      .typeError("Se debe ingresar un número")
      .when("kindOfPrice", {
        is: (kindOfPrice) =>
          kindOfPrice === "1" || kindOfPrice === "2" || kindOfPrice === "3",
        then: yup
          .number()
          .required("Campo requerido")
          .min(0, "Tiene que ser un número positivo."),
      }),
    capacidad2: yup
      .number()
      .typeError("Se debe ingresar un número")
      .when("kindOfPrice", {
        is: (kindOfPrice) =>
          kindOfPrice === "1" || kindOfPrice === "2" || kindOfPrice === "3",
        then: yup
          .number()
          .required("Campo requerido")
          .moreThan(yup.ref("capacidad"), "Ingresa una cantidad mayor"),
      }),
    name: yup
      .string()
      .required("Este campo es requerido")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    price: yup.string().required("Este campo es requerido"),
    description: yup.string(),
    kindOfPrice: yup.string().required("Campo requerido"),
    intervalo: yup
      .number()
      .typeError("Se debe ingresar un número")
      .when("kindOfPrice", {
        is: (kindOfPrice) =>
          kindOfPrice === "1" || kindOfPrice === "2" || kindOfPrice === "3",
        then: yup
          .number()
          .required("Campo requerido")
          .min(0, "Tiene que ser un número positivo."),
      }),
  });

  const deleteImage = (e, fotoName) => {
    const newFiles = imagenes.filter((fotos) => fotos.name !== fotoName);
    setImagenes(newFiles);
    if (fotoName === mainImage && newFiles.length > 0) {
      setMainImage(newFiles[0].name);
    }
    e.stopPropagation();
  };

  const deleteImageEdit = (e, fotoName) => {
    const newFiles = imagenes.filter((fotos) => fotos.name !== fotoName);
    setImagenes(newFiles);
    const newFilesUrl = imagesUrl.filter((fotos) => fotos !== fotoName);
    setImagesUrl(newFilesUrl);
    const imgToDelete = imagesUrl.filter((fotos) => fotos === fotoName);
    if (imgToDelete.length) {
      setImagesToDelete((prevState) => {
        return [...prevState, ...imgToDelete];
      });
    }
    if (fotoName === mainImage && newFiles.length > 0) {
      setMainImage(newFiles[0].name);
    }
    if (fotoName === mainImage && newFilesUrl.length > 0) {
      setMainImage(newFilesUrl[0]);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (modoEdicion) {
      const urlsPreview = imagenes.map((item) => {
        const objectUrl = URL.createObjectURL(item);
        // URL.revokeObjectURL(objectUrl);
        return objectUrl;
      });
      setImagenesPreviewUrl(urlsPreview);
    }
  }, [imagenes]);

  const handleChangeEdit = async (event) => {
    setLoadingImages(true);
    let filtroSizeRes;
    try {
      filtroSizeRes = await imageCompressorAndFilter(10000000, [
        ...event.target.files,
      ]);
    } catch (e) {
      filtroSizeRes = filterImageSize(10000000, [...event.target.files]);
    }
    setLoadingImages(false);
    let files = filtroSizeRes.filteredImages;
    if (filtroSizeRes.deleted) {
      setError(true);
      setErrorMsg(
        "Se intentaron subir imágenes muy pesadas y las tuvimos que descartar, tamaño máximo: 10MB por imágen."
      );
    }
    let fileNamesPrevImages = [];
    if (imagenes.length) {
      fileNamesPrevImages = imagenes.map((item) => {
        return item.name;
      });
    }
    files = files.filter((item) => !fileNamesPrevImages.includes(item.name));
    setImagenes([...imagenes, ...files]);

    if (files.length && !imagenes.length && !imagesUrl.length) {
      setMainImage(files[0].name);
    }
  };

  const deletePackage = () => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/deletePackage`,
        {
          idPackage: activeEditPackage.id,
          idAliado,
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setLoading(false);
        setError(true);
      });
  };

  const handleChange = async (event) => {
    setLoadingImages(true);
    let filtroSizeRes;
    try {
      filtroSizeRes = await imageCompressorAndFilter(10000000, [
        ...event.target.files,
      ]);
    } catch (e) {
      filtroSizeRes = filterImageSize(10000000, [...event.target.files]);
    }
    setLoadingImages(false);

    let files = filtroSizeRes.filteredImages;
    if (filtroSizeRes.deleted) {
      setError(true);
      setErrorMsg(
        "Se intentaron subir imágenes muy pesadas y las tuvimos que descartar, tamaño máximo: 10MB por imágen."
      );
    }
    let fileNamesPrevImages = [];
    if (imagenes.length) {
      fileNamesPrevImages = imagenes.map((item) => {
        return item.name;
      });
    }
    files = files.filter((item) => !fileNamesPrevImages.includes(item.name));

    files = [...imagenes, ...files];
    // Esto podría volver en un futuro, por eso se comenta
    // if (files.length > 15) {
    //   files = files.slice(0, 15);
    // }
    setImagenes([...files]);
    if (files.length && !imagenes.length) {
      setMainImage(files[0].name);
    }
  };

  const closeModal = () => {
    setError(false);
    setStepForm(1);
    setImagenes([]);
    setMainImage("");
    setPagesExtras([]);
    setPagesOpciones([]);
    handleClose();
  };
  const closeModalEdit = () => {
    setMainImage("");
    setImagenes([]);
    setImagesUrl([]);
    setImagesToDelete([]);
    setError(false);
    setStepForm(1);
    setPagesExtras([]);
    setPagesOpciones([]);
    setActiveEditPackage({});
    handleCloseEdit();
  };

  const handleSubmitImages = async (data) => {
    setLoading(true);
    const mainImageFile = imagenes.filter((item) => item.name === mainImage);
    const notMainImages = imagenes.filter((item) => item.name !== mainImage);
    let base64Encodedimages = [];
    if (notMainImages.length) {
      base64Encodedimages = await Promise.all(
        notMainImages.map((imagen) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imagen);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        })
      );
      base64Encodedimages = base64Encodedimages.map((item) => {
        return { main: false, url: false, img: item };
      });
    }
    let base64EncodedMainImage = [];
    if (mainImageFile.length) {
      base64EncodedMainImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(mainImageFile[0]);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      base64EncodedMainImage = [
        {
          main: true,
          url: false,
          img: base64EncodedMainImage,
        },
      ];
    }
    let allImagesArr = [];
    if (imagesUrl.length) {
      allImagesArr = imagesUrl.map((item) => {
        return { main: false, url: true, img: item };
      });
    }
    allImagesArr = [
      ...allImagesArr,
      ...base64Encodedimages,
      ...base64EncodedMainImage,
    ];
    allImagesArr = allImagesArr.map((item) => {
      if (item.img === mainImage) {
        item.main = true;
      }
      return item;
    });
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updatePackageImages`,
        {
          id: activeEditPackage.id,
          imagesToDelete,
          idAliado,
          images: allImagesArr,
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setLoading(false);
        setError(true);
      });
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    const mainImageFile = imagenes.filter((item) => item.name === mainImage);
    const allImages = imagenes.filter((item) => item.name !== mainImage);
    let base64Encodedimages = [];
    if (allImages.length) {
      base64Encodedimages = await Promise.all(
        allImages.map((imagen) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imagen);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        })
      );
    }
    const base64EncodedMainImage = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(mainImageFile[0]);
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
        }user/savePackage`,
        {
          imagenes: base64Encodedimages,
          mainImage: base64EncodedMainImage,
          data,
          pagesExtras,
          pagesOpciones,
          idAliado,
          isEdition,
        },
        userHeaders()
      )
      .then((res) => {
        const {
          id,
          name,
          price,
          description,
          imgUrl,
          allImages,
          pagesExtras,
          pagesOpciones,
          kindOfPrice,
          capacidad,
          capacidad2,
          intervalo,
          isWeekdayDependant,
          dias,
        } = res.data;
        setMainImage("");
        setImagenes([]);
        setStepForm(1);
        setLoading(false);
        setPagesExtras([]);
        setPagesOpciones([]);
        setPackages((prevState) => {
          return [
            ...prevState,
            {
              id,
              name,
              description,
              mainImage: imgUrl,
              price,
              allImages,
              pagesExtras,
              pagesOpciones,
              kindOfPrice,
              capacidad,
              capacidad2,
              intervalo,
              isWeekdayDependant,
              dias,
            },
          ];
        });
        handleClose();
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
      });
  };

  const handleChangeTab = (event, newValue) => {
    setStepForm(newValue + 1);
  };

  const handleSubmitUpdateInfoGeneral = async (data) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updateGeneralInfoPackage`,
        {
          data: { ...data, id: activeEditPackage.id },
          idAliado,
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    if (open || modoEdicion) {
      const myDiv = document.getElementById("containerDialogPaquetes");
      myDiv.scrollTop = 0;
    }
  }, [stepForm, scrollTopFlag]);

  return (
    <Dialog
      onClose={
        loading
          ? () => {}
          : () => {
              if (modoEdicion) {
                // closeModalEdit();
                window.location.reload();
              } else {
                setLastStep(stepForm);
                setStepForm(4);
              }
            }
      }
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={modoEdicion ? "md" : "lg"}
      fullScreen={!modoEdicion || mobileFullScreen}
      style={{ minWidth: "340px" }}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={
          loading
            ? () => {}
            : () => {
                if (modoEdicion) {
                  // closeModalEdit();
                  window.location.reload();
                } else {
                  setLastStep(stepForm);
                  setStepForm(4);
                }
              }
        }
        style={
          modoEdicion
            ? { padding: "0.8rem 0.8rem 0 0.8rem", position: "relative" }
            : {
                padding: "0.8rem",
                position: "relative",
              }
        }
      >
        {loading || !modoEdicion ? null : (
          <div className="packages-edit-delete-button" onClick={deletePackage}>
            <p className="packages-edit-delete-button-p">
              <span>
                <AiFillDelete
                  style={{ fontSize: "0.9rem", margin: "0 0.3rem 0.3rem 0" }}
                />
              </span>
              Eliminar paquete completo
            </p>
          </div>
        )}
        <p className="modal-reg-titulo" style={{ minHeight: "30px" }}>
          {modoEdicion
            ? mobile
              ? ""
              : "Edición de paquete"
            : "Crea tu paquete"}
        </p>
        <IconButton
          aria-label="close"
          onClick={
            loading
              ? () => {}
              : () => {
                  if (modoEdicion) {
                    // closeModalEdit();
                    window.location.reload();
                  } else {
                    setLastStep(stepForm);
                    setStepForm(4);
                  }
                }
          }
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            marginRight: "0.5rem",
            marginTop: "0.4rem",
          }}
          className="modal-reg-titulo"
        >
          <CloseIcon />
        </IconButton>
        {modoEdicion && (
          <Box
            sx={{ width: "100%", bgcolor: "background.paper" }}
            style={{ margin: "1rem 0 0 0" }}
          >
            <Tabs value={stepForm - 1} onChange={handleChangeTab} centered>
              <Tab
                label={mobileFullScreen ? "Información" : "Información general"}
                style={
                  mobileFullScreen
                    ? { fontSize: "0.8rem", outline: "none" }
                    : { outline: "none" }
                }
              />
              <Tab
                label="Páginas extra"
                style={
                  mobileFullScreen
                    ? { fontSize: "0.8rem", outline: "none" }
                    : { outline: "none" }
                }
              />
              <Tab
                label="Imágenes"
                style={
                  mobileFullScreen
                    ? { fontSize: "0.8rem", outline: "none" }
                    : { outline: "none" }
                }
              />
            </Tabs>
          </Box>
        )}
      </DialogTitle>
      <DialogContent
        dividers
        className="modal-create-package-wrp-scroll"
        style={modoEdicion ? { height: "600px" } : null}
        id="containerDialogPaquetes"
      >
        <Formik
          initialValues={
            modoEdicion
              ? {
                  name: activeEditPackage?.name ? activeEditPackage.name : "",
                  price: activeEditPackage?.price
                    ? `${activeEditPackage.price}`
                    : "",
                  description: activeEditPackage?.description
                    ? activeEditPackage.description
                    : "",
                  capacidad: activeEditPackage?.capacidad
                    ? `${activeEditPackage.capacidad}`
                    : "",
                  capacidad2: activeEditPackage?.capacidad2
                    ? `${activeEditPackage.capacidad2}`
                    : "",
                  intervalo: activeEditPackage?.intervalo
                    ? `${activeEditPackage.intervalo}`
                    : "",
                  kindOfPrice: activeEditPackage?.kindOfPrice
                    ? `${activeEditPackage.kindOfPrice}`
                    : "",
                  isWeekdayDependant: activeEditPackage?.isWeekdayDependant
                    ? `${activeEditPackage.isWeekdayDependant}`
                    : "0",
                  dias: {
                    Lu: activeEditPackage?.lu === 1,
                    Ma: activeEditPackage?.ma === 1,
                    Mi: activeEditPackage?.mi === 1,
                    Ju: activeEditPackage?.ju === 1,
                    Vi: activeEditPackage?.vi === 1,
                    Sa: activeEditPackage?.sa === 1,
                    Do: activeEditPackage?.do === 1,
                  },
                }
              : {
                  name: "",
                  price: "",
                  description: "",
                  capacidad: "",
                  capacidad2: "",
                  intervalo: "",
                  kindOfPrice: "4",
                  isWeekdayDependant: "0",
                  dias: {
                    Lu: false,
                    Ma: false,
                    Mi: false,
                    Ju: false,
                    Vi: false,
                    Sa: false,
                    Do: false,
                  },
                }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            validateForm,
            setTouched,
            values,
            setFieldValue,
            errors,
          }) => (
            <Form>
              <Grid container>
                {loading ? (
                  <div style={{ height: "300px" }}>
                    <Loading helperText="Esto puede tardar unos minutos" />
                  </div>
                ) : (
                  <>
                    {error ? (
                      <Grid item xs={12}>
                        <Alert
                          severity="error"
                          style={{ margin: "0 0.5rem 1.3rem 0.5rem" }}
                        >
                          {errorMsg}
                        </Alert>
                      </Grid>
                    ) : null}
                    {(() => {
                      switch (stepForm) {
                        case 1:
                          return (
                            <>
                              {modoEdicion ? null : (
                                <Grid item xs={12}>
                                  <p
                                    style={{
                                      fontSize: "0.9rem",
                                      margin: "1rem",
                                    }}
                                  >
                                    Un paquete es un servicio, conjunto de
                                    servicios o variaciones de presentaciones en
                                    las que tú, como proveedor de servicios o
                                    proveedor de un espacio físico, le ofreces
                                    al cliente diferentes posibilidades por
                                    diferentes precios, intenta crear la mayor
                                    cantidad de paquetes.
                                  </p>
                                </Grid>
                              )}
                              <Grid item xs={12}>
                                <MyTextField
                                  name="name"
                                  type="input"
                                  placeholder="Nombre del paquete"
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                style={{ padding: "0 0.5rem" }}
                              >
                                <MyLongText
                                  name="description"
                                  rows={mobileFullScreen ? 3 : 2}
                                  placeholder="Describe a tus clientes qué incluye este paquete y por qué les conviene comprarlo contigo..."
                                  style={{ width: "100%" }}
                                />
                              </Grid>
                              <div className="create-package-section-div">
                                <p className="create-package-section-div-p">
                                  Precio del paquete
                                  {!modoEdicion && (
                                    <>
                                      -{" "}
                                      <span style={{ fontWeight: 300 }}>
                                        Escoge un tipo de precio
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                              {!modoEdicion && (
                                <MyRadio name="kindOfPrice">
                                  <FormControlLabel
                                    value="1"
                                    checked={values.kindOfPrice === "1"}
                                    control={<Radio />}
                                    label="Por persona"
                                    name="kindOfPrice"
                                  />
                                  <FormControlLabel
                                    value="2"
                                    checked={values.kindOfPrice === "2"}
                                    control={<Radio />}
                                    label="Por hora"
                                    name="kindOfPrice"
                                  />
                                  <FormControlLabel
                                    value="3"
                                    checked={values.kindOfPrice === "3"}
                                    control={<Radio />}
                                    label="Por artículo"
                                    name="kindOfPrice"
                                  />
                                  <FormControlLabel
                                    value="4"
                                    checked={values.kindOfPrice === "4"}
                                    control={<Radio />}
                                    label="Total"
                                    name="kindOfPrice"
                                  />
                                </MyRadio>
                              )}
                              {/*<Grid item xs={12}>*/}
                              {/*  <MyMoneyInput*/}
                              {/*    name="price"*/}
                              {/*    placeholder="Precio del paquete"*/}
                              {/*    style={{*/}
                              {/*      width: "100%",*/}
                              {/*      paddingRight: "1rem",*/}
                              {/*      marginTop: "0.5rem",*/}
                              {/*    }}*/}
                              {/*  />*/}
                              {/*</Grid>*/}
                              <div className="create-package-section-price-input">
                                <MyMoneyInput
                                  name="price"
                                  placeholder="$"
                                  style={{
                                    width: "145px",
                                  }}
                                />
                                <p
                                  style={
                                    mobileFullScreen
                                      ? {
                                          margin: "1rem 0 0 0",
                                          fontSize: "0.8rem",
                                        }
                                      : { margin: "1rem 0 0 0" }
                                  }
                                >
                                  <span
                                    style={
                                      mobileFullScreen
                                        ? {
                                            fontWeight: 500,
                                            fontSize: "1rem",
                                            letterSpacing: "-1px",
                                          }
                                        : {
                                            fontWeight: 500,
                                            fontSize: "1.2rem",
                                            letterSpacing: "-1px",
                                          }
                                    }
                                  >
                                    MXN
                                  </span>{" "}
                                  {kindOfPrices[values.kindOfPrice]}
                                </p>
                              </div>
                              {values.kindOfPrice !== "4" && (
                                <div className="create-package-section-div">
                                  <p className="create-package-section-div-p">
                                    Agrega Rango permitido -{" "}
                                    <span style={{ fontWeight: 300 }}>
                                      el usuario podrá seleccionar entre el
                                      rango mínimo y máximo según el intervalo
                                      que permitas. Ej. si tu rango es de 10 a
                                      40 y pones un intervalo de 10, el usuario
                                      solo podrá seleccionar entre 10, 20, 30 y
                                      40.
                                    </span>
                                  </p>
                                  <div
                                    className="create-package-section-price-input"
                                    style={{ marginTop: "1rem" }}
                                  >
                                    <MyTextField
                                      name="capacidad"
                                      placeholder="Ej. 10"
                                      style={{
                                        width: "130px",
                                        margin: "0",
                                      }}
                                    />
                                    <p
                                      style={{
                                        margin: "1rem 1rem 0 1rem",
                                        textAlign: "center",
                                      }}
                                    >
                                      -
                                    </p>
                                    <MyTextField
                                      name="capacidad2"
                                      placeholder="Ej. 40"
                                      style={{
                                        width: "130px",
                                        margin: "0",
                                      }}
                                    />
                                  </div>
                                  <p className="create-package-section-div-p">
                                    Agrega intervalo
                                  </p>
                                  <div
                                    className="create-package-section-price-input"
                                    style={{ marginTop: "1rem" }}
                                  >
                                    <MyTextField
                                      name="intervalo"
                                      placeholder="Ej. 10"
                                      style={{
                                        width: "130px",
                                        margin: "0",
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="create-package-section-div">
                                <p className="create-package-section-div-p">
                                  ¿El precio de este paquete aplica para todos
                                  los días de la semana? -{" "}
                                  <span style={{ fontWeight: 300 }}>
                                    Esta pregunta la hacemos porque algunos
                                    proveedores y terrazas tienen diferentes
                                    precios dependiendo el día, sobre todo en
                                    fines de semana.
                                  </span>
                                </p>
                              </div>
                              <MyRadio name="isWeekdayDependant">
                                <FormControlLabel
                                  value="0"
                                  checked={values.isWeekdayDependant === "0"}
                                  control={<Radio />}
                                  label="Si"
                                  name="isWeekdayDependant"
                                />
                                <FormControlLabel
                                  value="1"
                                  checked={values.isWeekdayDependant === "1"}
                                  control={<Radio />}
                                  label="No"
                                  name="isWeekdayDependant"
                                />
                              </MyRadio>
                              {values.isWeekdayDependant === "1" && (
                                <>
                                  <div
                                    className="create-package-section-div"
                                    style={{ marginTop: "-0.4rem" }}
                                  >
                                    <p className="create-package-section-div-p">
                                      Selecciona los días de la semana en los
                                      que este paquete es válido
                                    </p>
                                  </div>
                                  <div
                                    className="create-package-section-price-input"
                                    style={{ marginTop: "1rem" }}
                                  >
                                    {Object.keys(dias).map((key, idx) => (
                                      <div
                                        className="create-packages-click-checkboxes"
                                        key={idx}
                                      >
                                        <label
                                          htmlFor={key}
                                          className="create-packages-click-checkboxes-label"
                                        >
                                          {key}
                                        </label>
                                        <Checkbox
                                          size="small"
                                          checked={dias[key]}
                                          id={key}
                                          onChange={() => {
                                            setDias({
                                              ...dias,
                                              [key]: !dias[key],
                                            });
                                            setFieldValue("dias", {
                                              ...dias,
                                              [key]: !dias[key],
                                            });
                                          }}
                                          style={
                                            dias[key]
                                              ? { color: "#0D3B66" }
                                              : null
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  {!Object.keys(dias).filter((key) => dias[key])
                                    .length ? (
                                    <div
                                      className="create-package-section-price-input"
                                      style={{ marginTop: "1rem" }}
                                    >
                                      <p
                                        style={{
                                          fontSize: "0.8rem",
                                          fontFamily: "Roboto, sans-serif",
                                          color: "#e93030",
                                        }}
                                      >
                                        Debe ser seleccionado mínimo un día
                                      </p>
                                    </div>
                                  ) : null}
                                </>
                              )}
                              {modoEdicion ? (
                                <div
                                  style={{
                                    textAlign: "center",
                                    marginTop: "2rem",
                                    marginBottom: "2rem",
                                    width: "100%",
                                  }}
                                >
                                  <Button
                                    className={classesBotones.buttonBlack}
                                    style={
                                      mobile
                                        ? { width: "100%" }
                                        : { width: "40%", margin: "8px" }
                                    }
                                    onClick={closeModalEdit}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    className={classesBotones.buttonPurp}
                                    style={
                                      mobile
                                        ? { width: "100%", marginTop: "0.8rem" }
                                        : { width: "40%", margin: "8px" }
                                    }
                                    onClick={async () => {
                                      const validation = await validateForm();
                                      setTouched({
                                        name: true,
                                        price: true,
                                        capacidad: true,
                                        capacidad2: true,
                                        intervalo: true,
                                      });
                                      if (
                                        Object.keys(validation).length === 0 &&
                                        (values.isWeekdayDependant === "0" ||
                                          (values.isWeekdayDependant === "1" &&
                                            Object.keys(dias).filter(
                                              (key) => dias[key]
                                            ).length))
                                      ) {
                                        handleSubmitUpdateInfoGeneral(values);
                                      } else {
                                        setTouched({
                                          name: true,
                                          price: true,
                                          description: true,
                                          capacidad: true,
                                          capacidad2: true,
                                          intervalo: true,
                                        });
                                      }
                                    }}
                                  >
                                    Guardar cambios
                                  </Button>
                                </div>
                              ) : (
                                <Grid item xs={12}>
                                  <Button
                                    className={classes.button}
                                    disabled={isSubmitting}
                                    style={{
                                      width: "100%",
                                      margin: "1.5rem 0",
                                    }}
                                    onClick={async () => {
                                      const validation = await validateForm();
                                      setTouched({
                                        name: true,
                                        price: true,
                                        capacidad: true,
                                        capacidad2: true,
                                        intervalo: true,
                                      });
                                      if (
                                        Object.keys(validation).length === 0 &&
                                        (values.isWeekdayDependant === "0" ||
                                          (values.isWeekdayDependant === "1" &&
                                            Object.keys(dias).filter(
                                              (key) => dias[key]
                                            ).length))
                                      ) {
                                        setStepForm(2);
                                      } else {
                                        setTouched({
                                          name: true,
                                          price: true,
                                          description: true,
                                          capacidad: true,
                                          capacidad2: true,
                                          intervalo: true,
                                        });
                                      }
                                    }}
                                  >
                                    Siguiente
                                  </Button>
                                </Grid>
                              )}
                            </>
                          );
                        case 2:
                          return (
                            <CreatePagesInPackages
                              setPagesOpciones={setPagesOpciones}
                              pagesOpciones={pagesOpciones}
                              setPagesExtras={setPagesExtras}
                              pagesExtras={pagesExtras}
                              nextPage={() => {
                                setStepForm(3);
                              }}
                              modoEdicion={modoEdicion}
                              setLoading={setLoading}
                              setError={setError}
                              setErrorMsg={setErrorMsg}
                              idPaqueteEnEdicion={activeEditPackage.id}
                              idAliado={idAliado}
                              setScrollTopFlag={setScrollTopFlag}
                              kindOfPrice={values.kindOfPrice}
                            />
                          );
                        case 3:
                          return modoEdicion ? (
                            <>
                              <div className="img-buttons-packages-modal">
                                <p
                                  style={{
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  La imagen seleccionada en morado será la
                                  principal. Puede cambiarla dando click sobre
                                  otra imagen.
                                </p>
                                <div className="package-mod-prin-img-success">
                                  {loadingImages ? (
                                    <div style={{ marginBottom: "2rem" }}>
                                      <p
                                        style={{
                                          color: "#0D3B66",
                                          opacity: 0.4,
                                          fontSize: "0.8rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Optimizando imágenes, espere un
                                        momento...
                                      </p>
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "100%",
                                        }}
                                      >
                                        <DotLoading />
                                      </div>
                                    </div>
                                  ) : imagesUrl.length ? (
                                    imagesUrl.map((file) => (
                                      <div
                                        className={`afil-div-preview-pckg ${
                                          mainImage === file ? "active" : null
                                        }`}
                                        key={Math.random()}
                                        onClick={() => setMainImage(file)}
                                      >
                                        <div
                                          style={{
                                            width: "100%",
                                            maxHeight: "150px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <img
                                            src={file}
                                            className="afil-img-preview-pckg"
                                            alt="Mi paquete"
                                          />
                                        </div>
                                        <div
                                          className="afil-img-preview-delete"
                                          onClick={(e) => {
                                            deleteImageEdit(e, file);
                                          }}
                                        >
                                          <ClearIcon
                                            style={{ fontSize: "0.8rem" }}
                                          />
                                        </div>
                                      </div>
                                    ))
                                  ) : null}
                                  {loadingImages
                                    ? null
                                    : imagenes.length
                                    ? imagenes.map((file, idx) => (
                                        <div
                                          className={`afil-div-preview-pckg ${
                                            mainImage === file.name
                                              ? "active"
                                              : null
                                          }`}
                                          key={Math.random()}
                                          onClick={() =>
                                            setMainImage(file.name)
                                          }
                                        >
                                          <div
                                            style={{
                                              width: "100%",
                                              maxHeight: "150px",
                                              overflow: "hidden",
                                            }}
                                          >
                                            <img
                                              src={imagenesPreviewUrl[idx]}
                                              className="afil-img-preview-pckg"
                                              alt="Mi paquete"
                                            />
                                          </div>
                                          <div
                                            className="afil-img-preview-delete"
                                            onClick={(e) => {
                                              deleteImageEdit(e, file.name);
                                            }}
                                          >
                                            <ClearIcon
                                              style={{ fontSize: "0.8rem" }}
                                            />
                                          </div>
                                        </div>
                                      ))
                                    : null}
                                </div>
                                <div
                                  className="img-button-principal"
                                  style={{ marginTop: "2rem" }}
                                >
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="contained-button-img-pckg-mas"
                                    type="file"
                                    multiple
                                    name="imagenes"
                                    onChange={handleChangeEdit}
                                  />
                                  <label
                                    htmlFor="contained-button-img-pckg-mas"
                                    className="principal-btn-upload"
                                    style={
                                      loadingImages
                                        ? {
                                            pointerEvents: "none",
                                            background: "#a7a7a7",
                                            opacity: 0.8,
                                          }
                                        : null
                                    }
                                  >
                                    <div component="span">
                                      Agregar más imágenes <PublishIcon />
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: "2rem",
                                  marginBottom: "2rem",
                                  width: "100%",
                                }}
                              >
                                <Button
                                  className={botones.buttonBlack}
                                  onClick={closeModalEdit}
                                  style={
                                    mobile
                                      ? { width: "100%" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  className={botones.buttonPurp}
                                  disabled={
                                    isSubmitting ||
                                    (!imagenes.length && !imagesUrl.length)
                                  }
                                  style={
                                    mobile
                                      ? { width: "100%", marginTop: "0.6rem" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                  onClick={handleSubmitImages}
                                >
                                  Guardar cambios
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12}>
                                <p
                                  style={{ fontSize: "0.9rem", margin: "1rem" }}
                                >
                                  Agrega imágenes relacionadas con el paquete,
                                  ayuda al cliente a entender qué incluye.
                                </p>
                              </Grid>
                              {imagenes.length ? null : (
                                <p
                                  style={{
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    margin: "1rem",
                                  }}
                                >
                                  Tienes que agregar al menos 1 imágen.
                                </p>
                              )}
                              <div className="img-buttons-packages-modal">
                                {loadingImages ? (
                                  <div style={{ marginBottom: "2rem" }}>
                                    <p
                                      style={{
                                        color: "#0D3B66",
                                        opacity: 0.4,
                                        fontSize: "0.8rem",
                                        textAlign: "center",
                                      }}
                                    >
                                      Optimizando imágenes, espere un momento...
                                    </p>
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      <DotLoading />
                                    </div>
                                  </div>
                                ) : imagenes.length ? (
                                  <>
                                    <p
                                      style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 500,
                                      }}
                                    >
                                      La foto seleccionada en morado será la
                                      foto principal. Puede cambiarla dando
                                      click sobre otra imágen.
                                    </p>
                                    <div className="package-mod-prin-img-success">
                                      {imagenes.length
                                        ? imagenes.map((file) => (
                                            <div
                                              className={`afil-div-preview-pckg ${
                                                mainImage === file.name
                                                  ? "active"
                                                  : null
                                              }`}
                                              key={Math.random()}
                                              onClick={() =>
                                                setMainImage(file.name)
                                              }
                                            >
                                              <div
                                                style={{
                                                  width: "100%",
                                                  maxHeight: "150px",
                                                  overflow: "hidden",
                                                }}
                                              >
                                                <img
                                                  src={URL.createObjectURL(
                                                    file
                                                  )}
                                                  className="afil-img-preview-pckg"
                                                  alt={"Mi paquete"}
                                                />
                                              </div>
                                              <div
                                                className="afil-img-preview-delete"
                                                onClick={(e) => {
                                                  deleteImage(e, file.name);
                                                }}
                                              >
                                                <ClearIcon
                                                  style={{ fontSize: "0.8rem" }}
                                                />
                                              </div>
                                            </div>
                                          ))
                                        : null}
                                    </div>

                                    <div
                                      className="img-button-principal"
                                      style={{ marginTop: "1rem" }}
                                    >
                                      <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="contained-button-img-pckg-mas"
                                        type="file"
                                        multiple
                                        name="imagenes"
                                        onChange={handleChange}
                                      />
                                      <label
                                        htmlFor="contained-button-img-pckg-mas"
                                        className="principal-btn-upload"
                                        style={
                                          loadingImages
                                            ? {
                                                pointerEvents: "none",
                                                background: "#a7a7a7",
                                                opacity: 0.8,
                                              }
                                            : null
                                        }
                                      >
                                        <div component="span">
                                          Agregar más imágines <PublishIcon />
                                        </div>
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  <div className="img-button-principal">
                                    <input
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      id="contained-button-img-pckg"
                                      type="file"
                                      multiple
                                      name="imagenes"
                                      onChange={handleChange}
                                    />
                                    <label
                                      htmlFor="contained-button-img-pckg"
                                      className="principal-btn-upload"
                                      style={
                                        loadingImages
                                          ? {
                                              pointerEvents: "none",
                                              background: "#a7a7a7",
                                              opacity: 0.8,
                                            }
                                          : null
                                      }
                                    >
                                      <div component="span">
                                        Agregar imágenes <PublishIcon />
                                      </div>
                                    </label>
                                  </div>
                                )}
                              </div>
                              <Grid
                                item
                                xs={12}
                                style={{ textAlign: "center" }}
                              >
                                <Button
                                  className={classes.button}
                                  type="submit"
                                  disabled={
                                    isSubmitting ||
                                    !imagenes.length ||
                                    loadingImages
                                  }
                                  style={
                                    mobile
                                      ? {
                                          width: "100%",
                                          margin: "4rem 0 2rem 0",
                                          padding: "0.8rem 0",
                                        }
                                      : {
                                          width: "50%",
                                          margin: "4rem 0 2rem 0",
                                          padding: "0.8rem 0",
                                        }
                                  }
                                >
                                  {modoEdicion
                                    ? "Guardar cambios"
                                    : "Crear paquete"}
                                </Button>
                              </Grid>
                            </>
                          );
                        case 4:
                          return (
                            <div className="packages-delete-confirmation-step4">
                              <p>
                                ¿Estás seguro que quieres eliminar todo el
                                progreso de este paquete y salir?
                              </p>
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: "2rem",
                                  marginBottom: "2rem",
                                  width: "100%",
                                }}
                              >
                                <Button
                                  className={botones.buttonBlack}
                                  style={
                                    mobile
                                      ? { width: "100%" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                  onClick={closeModal}
                                >
                                  Si, quiero borrar este paquete
                                </Button>
                                <Button
                                  className={botones.buttonPurp}
                                  style={
                                    mobile
                                      ? { width: "100%", marginTop: "0.8rem" }
                                      : { width: "40%", margin: "8px" }
                                  }
                                  onClick={() => {
                                    setStepForm(lastStep);
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          );
                      }
                    })()}
                  </>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
