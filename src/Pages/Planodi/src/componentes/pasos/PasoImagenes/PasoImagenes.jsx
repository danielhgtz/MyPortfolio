import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PublishIcon from "@material-ui/icons/Publish";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from "react-router-dom";

import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";
import {
  filterImageSize,
  imageCompressorAndFilter,
} from "../../../Utils/filterSize";
import ErrorMsg from "../../ErrorMsg";
import DotLoading from "../../DotLoading/DotLoading";
import { botonesAtrasYAdelante } from "../PasoForm";

import "./PasoImagenes.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io/index";

export default function PasoImagenes({
  premium,
  setStep,
  idAliado,
  infoPlan,
  currentImages,
  isEdition,
  isCollapsible,
  initialMain,
  isMainPage,
  isSelected,
  setIsSelected,
  isAdminPage,
  backAdminPage,
  submitStepAdmin,
}) {
  const navigate = useNavigate();
  const buttonTypes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");

  const [imagenes, setImagenes] = useState([]);
  const [savedImages, setSavedImages] = useState(currentImages);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [advertenciaFiles, setAdvertenciaFiles] = useState(false);
  const [advertenciaSize, setAdvertenciaSize] = useState(false);
  const [error, setError] = useState(false);
  const [premiumAndMoreImages, setPremiumAndMoreImages] = useState(false);
  const [collapse, setCollapse] = useState(!isSelected);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, intetnalo más tarde"
  );
  const [mainImage, setMainImage] = useState(initialMain);

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

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
      setAdvertenciaSize(true);
    }
    if (files.length > infoPlan.cantidadDeFotos && !premium) {
      files = files.slice(0, infoPlan.cantidadDeFotos);
      setAdvertenciaFiles(true);
    }
    if (premium && files.length > 7 && !isEdition) {
      files = files.slice(0, 7);
      setPremiumAndMoreImages(true);
    }
    setMainImage(files[0].name);
    setImagenes(files);
  };

  const handleMoreImages = async (event) => {
    setLoadingImages(true);
    let filtroSizeRes;
    try {
      filtroSizeRes = await imageCompressorAndFilter(10000000, [
        ...imagenes,
        ...event.target.files,
      ]);
    } catch (e) {
      filtroSizeRes = filterImageSize(10000000, [
        ...imagenes,
        ...event.target.files,
      ]);
    }
    setLoadingImages(false);
    let files = filtroSizeRes.filteredImages;
    if (filtroSizeRes.deleted) {
      setAdvertenciaSize(true);
    }
    if (files.length > infoPlan.cantidadDeFotos && !premium) {
      files = files.slice(0, infoPlan.cantidadDeFotos);
      setAdvertenciaFiles(true);
    }
    if (premium && files.length > 7 && !isEdition) {
      files = files.slice(0, 7);
      setPremiumAndMoreImages(true);
    }
    setImagenes(files);
  };

  const deleteImage = (fotoIdentifier, isSavedImage = false) => {
    if (isSavedImage) {
      const filteredSavedImages = savedImages.filter(
        (fotos) => fotos.id !== fotoIdentifier
      );
      setImagesToDelete([...imagesToDelete, fotoIdentifier]);
      setSavedImages(filteredSavedImages);
      if (
        fotoIdentifier.toString() === mainImage &&
        (filteredSavedImages.length || imagenes.length)
      ) {
        if (imagenes.length) {
          setMainImage(imagenes[0].name);
        } else {
          setMainImage(filteredSavedImages[0].id.toString());
        }
      }
      if (!filteredSavedImages.length && !imagenes.length) {
        setMainImage("");
      }
      return;
    }
    const newFiles = imagenes.filter((fotos) => fotos.name !== fotoIdentifier);
    setImagenes(newFiles);
    if (
      fotoIdentifier === mainImage &&
      (newFiles.length || savedImages.length)
    ) {
      if (savedImages.length) {
        setMainImage(savedImages[0].id.toString());
      } else {
        setMainImage(newFiles[0].name);
      }
    }
    if (!savedImages.length && !newFiles.length) {
      setMainImage("");
    }
  };

  const handleSubmitImages = async () => {
    setLoading(true);
    const mainFile = imagenes.filter((file) => file.name === mainImage);
    let imagenesSinMain = imagenes.filter((file) => file.name !== mainImage);
    const base64Encodedimages = await Promise.all(
      imagenesSinMain.map((imagen) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(imagen);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      })
    );

    let objMainImage;
    if (mainFile.length) {
      const base64EncodedMainImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(mainFile[0]);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      objMainImage = { saved: false, id: null, base64: base64EncodedMainImage };
    } else {
      objMainImage = { saved: true, id: parseInt(mainImage), base64: null };
    }
    if (isAdminPage) {
      submitStepAdmin(4, {
        imagenes: base64Encodedimages,
        idAliado: null,
        isEdition: false,
        imagesToDelete,
        totalSavedImages: savedImages.length,
        mainImage: objMainImage,
      });
      return;
    }
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/images`,
        {
          imagenes: base64Encodedimages,
          idAliado,
          isEdition,
          imagesToDelete,
          totalSavedImages: savedImages.length,
          mainImage: objMainImage,
        },
        userHeaders()
      )
      .then(() => {
        setLoading(false);
        setStep(7);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.msg) {
          setErrorMsg(err.response.data.msg);
        }
        setError(true);
      });
  };

  return (
    <div
      style={
        isEdition && mobile
          ? null
          : {
              minHeight: "58vh",
            }
      }
    >
      {loading ? (
        <div
          style={{
            height: "400px",
            position: "relative",
            width: "100%",
          }}
        >
          <Loading helperText="Esto podría tardar unos minutos. No actualice la página." />
        </div>
      ) : (
        <div style={{ minWidth: "320px" }}>
          {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
          <p
            className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(2);
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
            Imágenes
          </p>
          {(!collapse || !isCollapsible) && (
            <>
              <p className="url-txt-instruc2" style={{ marginBottom: "3rem" }}>
                Las imágenes son parte importante para que el usuario tome la
                decisión final, busca que tus imágenes tengan una buena calidad
                para que tu negocio de una mejor impresión y lo posicionemos
                mejor. La foto seleccionada en morado será la principal. Puede
                cambiarla dando click sobre otra imagen.
              </p>
              {premium ? (
                premiumAndMoreImages ? (
                  <Grid
                    item
                    className="afil-txt-flx"
                    style={{ marginBottom: "1rem", padding: "0 1rem" }}
                  >
                    <p className="afil-img-txt2">
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: "#8c50ff",
                        }}
                      >
                        ⚠
                      </span>{" "}
                      Por ahora solo puedes subir <b>7 imágenes.</b> Una vez
                      termines tu registro puedes agregar las imágenes que
                      desees en el apartado de "mi negocio".
                    </p>
                  </Grid>
                ) : null
              ) : (
                <Grid item className="afil-txt-flx">
                  <p className="afil-img-txt2">
                    Usted puede subir hasta{" "}
                    <b>{infoPlan.cantidadDeFotos} imágenes</b>
                  </p>
                </Grid>
              )}
              {advertenciaFiles ? (
                <ErrorMsg
                  setError={setAdvertenciaFiles}
                  errorMsg={`Solo puedes subir un máximo de ${infoPlan.cantidadDeFotos} imágenes. Cambia de plan para poder subir más.`}
                />
              ) : null}
              {advertenciaSize ? (
                <ErrorMsg
                  setError={setAdvertenciaSize}
                  errorMsg="Se intentaron subir imágenes muy pesadas y las tuvimos que descartar, tamaño máximo: 10MB por imágen."
                />
              ) : null}
              {imagenes.length || savedImages.length ? (
                <Grid item className="afil-btns-imgs-flx">
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file-add"
                    multiple
                    type="file"
                    name="imagenesAdd"
                    onChange={handleMoreImages}
                  />
                  <label
                    htmlFor="contained-button-file-add"
                    className="afil-btn-upload-more"
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
                      AGREGAR MÁS IMÁGENES <AddCircleOutlineIcon />
                    </div>
                  </label>
                  {isEdition ? null : (
                    <div
                      style={
                        loadingImages
                          ? { pointerEvents: "none", opacity: 0.7 }
                          : null
                      }
                      className="afil-btn-finalizar"
                      onClick={handleSubmitImages}
                    >
                      Continuar <ArrowRightIcon />
                    </div>
                  )}
                </Grid>
              ) : (
                <Grid item className="afil-txt-flx">
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="imagenes"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="contained-button-file"
                    className="afil-btn-upload"
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
                      SELECCIONAR IMÁGENES <PublishIcon />
                    </div>
                  </label>
                </Grid>
              )}
              <Grid item className="afil-img-preview-wrap">
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
                    <div style={{ position: "relative", width: "100%" }}>
                      <DotLoading />
                    </div>
                  </div>
                ) : imagenes.length || currentImages.length ? (
                  <>
                    {imagenes.length > 0 &&
                      imagenes.map((file) => (
                        <div
                          style={{
                            position: "relative",
                          }}
                          key={Math.random()}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            className={`afil-img-preview ${
                              file.name === mainImage && "main"
                            }`}
                            alt={"Mi negocio"}
                            onClick={() => setMainImage(file.name)}
                          />
                          <div
                            className="afil-img-preview-delete"
                            onClick={() => {
                              deleteImage(file.name);
                            }}
                          >
                            <ClearIcon style={{ fontSize: "0.8rem" }} />
                          </div>
                        </div>
                      ))}
                    {savedImages.length > 0 &&
                      savedImages.map((img) => (
                        <div
                          style={{
                            position: "relative",
                          }}
                          key={img.id}
                        >
                          <img
                            src={img.url}
                            className={`afil-img-preview ${
                              img.id.toString() === mainImage && "main"
                            }`}
                            alt={"Mi negocio"}
                            onClick={() => setMainImage(img.id.toString())}
                          />
                          <div
                            className="afil-img-preview-delete"
                            onClick={() => {
                              deleteImage(img.id, true);
                            }}
                          >
                            <ClearIcon style={{ fontSize: "0.8rem" }} />
                          </div>
                        </div>
                      ))}
                  </>
                ) : null}
              </Grid>
              {isEdition && (
                <div
                  style={
                    mobile
                      ? {
                          width: "100%",
                          textAlign: "center",
                          marginTop: "2rem",
                        }
                      : { width: "100%", textAlign: "right", marginTop: "2rem" }
                  }
                >
                  <Button
                    className={buttonTypes.cancelButton}
                    style={mobile ? { width: "100%" } : { width: "30%" }}
                    onClick={() =>
                      navigate.push(isMainPage ? "?paso=5" : "/mis-negocios")
                    }
                    disabled={loadingImages}
                  >
                    {isMainPage ? "Regresar" : "Cancelar"}
                  </Button>
                  <Button
                    className={buttonTypes.saveButton}
                    style={
                      mobile
                        ? { width: "100%", marginTop: "1.5rem" }
                        : { width: "30%", marginLeft: "1.5rem" }
                    }
                    onClick={handleSubmitImages}
                    disabled={loadingImages}
                  >
                    {isMainPage
                      ? "Guardar cambios y continuar"
                      : "Guardar cambios"}
                  </Button>
                </div>
              )}

              {!isEdition && (
                <div
                  style={
                    mobile
                      ? {
                          width: "100%",
                          textAlign: "center",
                          marginTop: "2rem",
                        }
                      : { width: "100%", textAlign: "right", marginTop: "2rem" }
                  }
                >
                  <Button
                    className={buttonTypes.cancelButton}
                    style={mobile ? { width: "100%" } : { width: "30%" }}
                    onClick={() => {
                      if (isAdminPage) {
                        backAdminPage();
                      } else {
                        navigate.push("?paso=5");
                      }
                    }}
                    disabled={loadingImages}
                  >
                    Regresar
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

PasoImagenes.propTypes = {
  setStep: PropTypes.func.isRequired,
  idAliado: PropTypes.number.isRequired,
  setIsSelected: PropTypes.func,
  isEdition: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  isMainPage: PropTypes.bool,
  infoPlan: PropTypes.shape({ cantidadDeFotos: PropTypes.number }),
  premium: PropTypes.bool,
  isSelected: PropTypes.bool,
  initialMain: PropTypes.string,
  currentImages: PropTypes.arrayOf(
    PropTypes.shape({
      aliado: PropTypes.number,
      id: PropTypes.number,
      imagen: PropTypes.number,
      isActive: PropTypes.number,
      main: PropTypes.number,
      url: PropTypes.string,
    })
  ),
};

PasoImagenes.defaultProps = {
  setIsSelected: () => null,
  isEdition: false,
  isCollapsible: false,
  isMainPage: false,
  infoPlan: { cantidadDeFotos: 3 },
  premium: false,
  isSelected: false,
  currentImages: [],
  initialMain: "",
};
