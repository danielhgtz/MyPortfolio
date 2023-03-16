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
import { alpha } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { AiFillDelete } from "react-icons/ai";

import "../PasoImagenes/PasoImagenes.css";
import "./PasoCreatePackages.css";
import MyTextField from "../../formikInputs/MyTextField/MyTextField";
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
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import DotLoading from "../../DotLoading/DotLoading";

const useStyles = makeStyles(() => ({
  buttonGuardar: {
    height: "45px",
    width: "50%",
    margin: "0 1rem",
    borderRadius: "10px",
    fontSize: "0.8rem",
    backgroundColor: "#8c50ff",
    color: "white",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: alpha("#8c50ff", 0.9),
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonCancelar: {
    height: "45px",
    width: "50%",
    margin: "0 1rem",
    borderRadius: "10px",
    fontSize: "0.8rem",
    backgroundColor: "white",
    color: "#8c50ff",
    border: "solid #8c50ff 2px",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalEditPackages({
  handleClose,
  open,
  packages,
  setPackages,
  activeEditPackage,
  idAliado,
}) {
  const { name, price, description, allImages, id } = activeEditPackage;
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [deletePackageClick, setDeletePackageClick] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error en el servidor, comunícate con nosotros"
  );
  const [imagenes, setImagenes] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [imagenesPreviewUrl, setImagenesPreviewUrl] = useState([]);

  const classes = useStyles();
  const mobile = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    if (open) {
      const main = allImages
        .filter((item) => item.main)
        .map((item) => {
          return item.url;
        });
      setMainImage(main[0]);
      setImagesUrl(
        allImages.map((item) => {
          return item.url;
        })
      );
    }
  }, [allImages, open]);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Este campo es requerido")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    price: yup.string().required("Este campo es requerido"),
    description: yup
      .string()
      .max(198, "La descripción no puede exceder los 198 caracteres"),
  });

  const deleteImage = (e, fotoName) => {
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
    const urlsPreview = imagenes.map((item) => {
      const objectUrl = URL.createObjectURL(item);
      // URL.revokeObjectURL(objectUrl);
      return objectUrl;
    });
    setImagenesPreviewUrl(urlsPreview);
  }, [imagenes]);

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
    if (files.length + imagesUrl.length + imagenes.length > 5) {
      const countImages = 5 - (imagesUrl.length + imagenes.length);
      files = files.slice(0, countImages);
    }
    setImagenes([...imagenes, ...files]);

    if (files.length && !imagenes.length && !imagesUrl.length) {
      setMainImage(files[0].name);
    }
  };

  const deletePackage = () => {
    setDeletePackageClick(false);
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/deletePackage`,
        {
          idPackage: id,
        },
        userHeaders()
      )
      .then(() => {
        setMainImage("");
        setImagenes([]);
        setImagesUrl([]);
        setImagesToDelete([]);
        setLoading(false);
        const newPackages = packages.filter((item) => item.id !== id);
        setPackages([...newPackages]);
        handleClose();
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

  return (
    <Dialog
      onClose={
        loading
          ? () => {}
          : () => {
              setMainImage("");
              setImagenes([]);
              setImagesUrl([]);
              setImagesToDelete([]);
              setError(false);
              handleClose();
            }
      }
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
      fullScreen={mobile}
      style={{ minWidth: "340px" }}
    >
      {deletePackageClick ? (
        <div className="packages-delete-confirmation-wrp">
          <p style={{ textAlign: "center" }}>
            ¿Está seguro que quiere eliminar este paquete?
          </p>
          <div className="packages-edit-bttns-wrp">
            <Button
              className={classes.buttonCancelar}
              onClick={() => setDeletePackageClick(false)}
            >
              Cancelar
            </Button>
            <Button className={classes.buttonGuardar} onClick={deletePackage}>
              Si
            </Button>
          </div>
        </div>
      ) : (
        <>
          <DialogTitle
            id="customized-dialog-title"
            onClose={
              loading
                ? () => {}
                : () => {
                    setMainImage("");
                    setImagenes([]);
                    setImagesUrl([]);
                    setImagesToDelete([]);
                    setError(false);
                    handleClose();
                  }
            }
            style={{
              padding: "0.8rem",
              position: "relative",
            }}
          >
            {loading ? null : (
              <div
                className="packages-edit-delete-button"
                onClick={() => setDeletePackageClick(true)}
              >
                <p className="packages-edit-delete-button-p">
                  <span>
                    <AiFillDelete
                      style={{ fontSize: "1rem", margin: "0 0.3rem 0.3rem 0" }}
                    />
                  </span>
                  Eliminar
                </p>
              </div>
            )}
            <p className="modal-reg-titulo">Edita</p>
            <IconButton
              aria-label="close"
              onClick={
                loading
                  ? () => {}
                  : () => {
                      setMainImage("");
                      setImagenes([]);
                      setImagesUrl([]);
                      setImagesToDelete([]);
                      setError(false);
                      handleClose();
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
          </DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={{
                name,
                price,
                description,
              }}
              validationSchema={validationSchema}
              onSubmit={async (data, { setSubmitting }) => {
                setSubmitting(true);
                setLoading(true);
                const mainImageFile = imagenes.filter(
                  (item) => item.name === mainImage
                );
                const notMainImages = imagenes.filter(
                  (item) => item.name !== mainImage
                );
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
                    }user/updatePackage`,
                    {
                      data: { ...data, id },
                      imagesToDelete,
                      idAliado,
                      images: allImagesArr,
                    },
                    userHeaders()
                  )
                  .then((res) => {
                    const { images: imagesRes } = res.data;
                    const newMain = imagesRes
                      .filter((item) => item.main)
                      .map((item) => {
                        return item.url;
                      });
                    setMainImage("");
                    setImagenes([]);
                    setImagesUrl([]);
                    setImagesToDelete([]);
                    const newPackages = packages.filter(
                      (item) => item.id !== id
                    );
                    setPackages([
                      ...newPackages,
                      {
                        id,
                        name: data.name,
                        mainImage: newMain[0],
                        price: parseInt(data.price),
                        allImages: imagesRes,
                        description: data.description,
                      },
                    ]);
                    setLoading(false);
                    setError(false);
                    handleClose();
                  })
                  .catch((e) => {
                    const { response } = e;
                    if (response && response.data && response.data.msg) {
                      if (response.data.msg) setErrorMsg(response.data.msg);
                    }
                    setLoading(false);
                    setError(true);
                  });
              }}
            >
              {({ isSubmitting }) => (
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
                        <Grid item xs={12}>
                          <MyTextField
                            name="name"
                            type="input"
                            placeholder="Nombre del paquete"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MyMoneyInput
                            name="price"
                            placeholder="Precio del paquete"
                            style={{ width: "100%", paddingRight: "1rem" }}
                          />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "0 0.5rem" }}>
                          <MyLongText
                            name="description"
                            rows={2}
                            placeholder="Describe a tus clientes qué incluye este paquete y por qué les conviene comprarlo contigo"
                            style={{ width: "100%", marginTop: "0.5rem" }}
                          />
                        </Grid>

                        <div className="img-buttons-packages-modal">
                          <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                            La imagen seleccionada en morado será la principal.
                            Puede cambiarla dando click sobre otra imagen.
                            Máximo 5 imágenes por paquete.
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
                                      deleteImage(e, file);
                                    }}
                                  >
                                    <ClearIcon style={{ fontSize: "0.8rem" }} />
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
                                      mainImage === file.name ? "active" : null
                                    }`}
                                    key={Math.random()}
                                    onClick={() => setMainImage(file.name)}
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
                          {imagenes.length + imagesUrl.length >= 5 ? null : (
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
                                  Agregar más imágenes <PublishIcon />
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="packages-edit-bttns-wrp">
                          <Button
                            className={classes.buttonCancelar}
                            onClick={() => {
                              setMainImage("");
                              setImagenes([]);
                              setImagesUrl([]);
                              setImagesToDelete([]);
                              setError(false);
                              handleClose();
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            className={classes.buttonGuardar}
                            type="submit"
                            disabled={
                              isSubmitting ||
                              (!imagenes.length && !imagesUrl.length)
                            }
                          >
                            Guardar cambios
                          </Button>
                        </div>
                      </>
                    )}
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
