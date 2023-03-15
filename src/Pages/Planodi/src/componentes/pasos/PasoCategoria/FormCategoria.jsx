/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form as FormikForm } from "formik";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MySelect from "../../formikInputs/MySelect/MySelect";
import MyTextField from "../../formikInputs/MyTextField/MyTextField";
import MyCelInput from "../../formikInputs/MyCelInput/MyCelInput";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import { botonesAtrasYAdelante } from "../PasoForm";
import useDidMountEffect from "../../Hooks/useDidMountEffect";

import "../../../Pages/Afiliarme/Afiliarme.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function FormCategoria({
  values,
  setFieldValue,
  categorias,
  estados,
  setTags,
  tags,
  isEdition,
  isTerraza,
  isMainPage,
  comenzarDeNuevo,
  isAdminPage,
}) {
  const navigate = useNavigate();
  const buttonTypes = botonesAtrasYAdelante();
  const movil = useMediaQuery("(max-width:960px)");
  const [nombreHelp, setNombreHelp] = useState(false);
  const [tagsHelp, setTagsHelp] = useState(false);
  const [whatsHelp, setWhatsHelp] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [ciudades, setCiudades] = useState([{ ciudad: "", estado: "", id: 0 }]);
  const [visibleTags, setVisibleTags] = useState({
    ciudad: "",
    estado: "",
    nombre: "",
    categoria: "",
  });

  useEffect(() => {
    if (values.estado !== "-1") {
      setFieldValue("ciudad", "-1");
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/getCiudades?idEstado=${values.estado}`,
          userHeaders(false)
        )
        .then((res) => {
          const { ciudades } = res.data;
          setCiudades(ciudades);
        })
        .catch((e) => {
          // TODO: Handler del error
          console.log(e);
        });
    }
  }, [setFieldValue, values.estado]);

  useEffect(() => {
    if (isEdition && ciudades && values.ciudad) {
      setFieldValue("ciudad", values.ciudad);
    }
  }, [isEdition, ciudades, values.ciudad]);

  useEffect(() => {
    if (isEdition && values.currentTags) {
      let initialTags = {};
      if (values.currentTags.indexOf("*") !== -1) {
        setFieldValue(
          "currentTags",
          values.currentTags.substring(values.currentTags.indexOf("*") + 2)
        );
        if (!tags.length) {
          setTags([
            ...tags,
            ...values.currentTags
              .substring(0, values.currentTags.indexOf("*") - 1)
              .split(","),
          ]);
        }
      } else {
        values.currentTags.split(",").forEach((tag) => {
          initialTags = { ...initialTags, [tag]: tag };
        });
        setVisibleTags({ ...initialTags });
      }
    }
  }, [values.currentTags]);

  useDidMountEffect(() => {
    if (isEdition) setVisibleTags({ nombre: values.nombre });
    if (values.estado !== "-1") {
      setVisibleTags((prevState) => {
        return {
          ...prevState,
          estado: estados.filter((item) => {
            return parseInt(item.id) === parseInt(values.estado);
          })[0].estado,
        };
      });
    }
    if (values.categoria !== "-1") {
      setVisibleTags((prevState) => {
        return {
          ...prevState,
          categoria: categorias.filter((item) => {
            return item.id === parseInt(values.categoria);
          })[0].name,
        };
      });
    }

    if (values.ciudad !== "-1") {
      const ciudadStr = ciudades.filter((item) => {
        return item.id === parseInt(values.ciudad);
      })[0].ciudad;
      setFieldValue("ciudadSelected", ciudadStr);
      setVisibleTags((prevState) => {
        return {
          ...prevState,
          ciudad: ciudadStr,
        };
      });
    } else {
      handleDeleteShowTags("ciudad");
    }
  }, [values.estado, values.categoria, values.ciudad, values.nombre]);

  const handleDelete = (val) => {
    const newTags = tags.filter((tag) => tag !== val);
    setTags(newTags);
  };

  const handleDeleteShowTags = (key) => {
    setVisibleTags((prevState) => {
      const prev = prevState;
      prev[key] = "";
      return { ...prev };
    });
  };

  return (
    <FormikForm
      style={
        movil
          ? { width: "100%", marginTop: "2rem" }
          : { width: "100%", marginTop: "3rem" }
      }
    >
      <Dialog
        onClose={() => {
          setConfModal(false);
        }}
        open={confModal}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <p style={{ color: "#3b3b3b", fontSize: "1rem", fontWeight: 500 }}>
            ¿Estás seguro de que quieres comenzar un nuevo aliado desde cero?
          </p>
          <p
            style={{
              color: "#3b3b3b",
              fontSize: "0.9rem",
              textAlign: "left",
              width: "100%",
            }}
          >
            Se eliminará el progereso que llevas hasta ahora
          </p>
          <div style={{ width: "100%" }}>
            <Button
              className={buttonTypes.saveButton}
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={() => setConfModal(false)}
            >
              Cancelar
            </Button>
            <Button
              className={buttonTypes.cancelButton}
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={comenzarDeNuevo}
            >
              Comenzar desde cero
            </Button>
          </div>
        </div>
      </Dialog>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            margin: "0 0 1.5rem 0",
          }}
        >
          <MySelect
            name="categoria"
            placeholder="Categoría*"
            disabled={isEdition && isTerraza}
          >
            {categorias.map((categoria) =>
              isEdition && !isTerraza ? (
                <option
                  value={categoria.id}
                  key={categoria.id}
                  disabled={categoria.id === 3}
                >
                  {categoria.name}
                </option>
              ) : (
                <option value={categoria.id} key={categoria.id}>
                  {categoria.name}
                </option>
              )
            )}
          </MySelect>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            margin: "0 0 1.5rem 0",
          }}
        >
          <MySelect name="estado" placeholder="Estado*">
            {estados.map((estado) => (
              <option value={estado.id} key={estado.id}>
                {estado.estado}
              </option>
            ))}
          </MySelect>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            margin: "0 0 1.5rem 0",
          }}
        >
          <MySelect
            name="ciudad"
            placeholder="Ciudad (opcional)"
            disabled={values.estado === "-1" || isAdminPage}
          >
            {ciudades.map((ciudad) => (
              <option value={ciudad.id} key={ciudad.id}>
                {ciudad.ciudad}
              </option>
            ))}
          </MySelect>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className="postion-rel"
          style={{
            margin: "0 0 1.5rem 0",
          }}
        >
          <MyTextField
            name="nombre"
            placeholder="Nombre de tu negocio*"
            customHandleBlur={() => {
              setNombreHelp(false);
              setVisibleTags((prevState) => {
                return { ...prevState, nombre: values.nombre };
              });
            }}
            onFocus={() => {
              setNombreHelp(true);
            }}
          />
          {nombreHelp ? (
            <p className="helper-text-input">
              💡 Este es el nombre principal de tu negocio.
            </p>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className="postion-rel"
          style={
            movil
              ? {
                  margin: "-1rem 0 1.5rem 0",
                }
              : {
                  margin: "0 0 1.5rem 0",
                }
          }
        >
          <MyCelInput
            name="whatsapp"
            label="Whatsapp"
            placeholder="Ingresa tu whatsapp*"
            customHandleBlur={() => {
              setWhatsHelp(false);
            }}
            onFocus={() => {
              setWhatsHelp(true);
            }}
          />
          {whatsHelp ? (
            <p className="helper-text-input" style={{ maxWidth: "20rem" }}>
              💡 Whatsapp de la empresa con el cual puedes brindar una respuesta
              rápida al cliente. Por este medio te redirigiremos a los usuarios
              interesados.
            </p>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={{
            margin: "-1rem 0 0 0",
          }}
        >
          <MyTextField
            name="tags"
            customHandleBlur={() => {
              setTagsHelp(false);
            }}
            onFocus={() => {
              setTagsHelp(true);
            }}
            customHandleChange={(e) => {
              if (e.target.value.substr(e.target.value.length - 1) === ",") {
                const newArr = tags;
                newArr.push(e.target.value.slice(0, -1));
                setTags(newArr);
                setFieldValue("tags", "");
              }
            }}
            placeholder="Tags"
          />
          {Object.keys(visibleTags).map((key, idx) => {
            if (visibleTags[key] !== "") {
              return (
                <Chip
                  key={idx}
                  color="primary"
                  size="small"
                  label={visibleTags[key]}
                  onDelete={() => handleDeleteShowTags(key)}
                  style={{ marginLeft: "3px" }}
                />
              );
            }
          })}
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              color="primary"
              size="small"
              label={tag}
              onDelete={() => {
                handleDelete(tag);
              }}
              style={{ marginLeft: "3px" }}
            />
          ))}
          {tagsHelp ? (
            <p className="helper-text-input" style={{ maxWidth: "30rem" }}>
              💡 Los tags son palabras claves que te ayudan a ser encontrado de
              mejor forma, entre más pongas mejor.{" "}
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                Sepáralos por comas
              </span>
              , evita usar acentos. Por ejemplo: grupo,musica,jazz,rock
            </p>
          ) : null}
        </Grid>
        <Grid
          item
          container
          style={
            isEdition
              ? { marginTop: "1.5rem", marginBottom: "1.5rem" }
              : { marginTop: "3rem", marginBottom: "3rem" }
          }
        >
          {isEdition ? (
            <Grid
              item
              xs={12}
              style={movil ? { textAlign: "center" } : { textAlign: "right" }}
            >
              {isMainPage ? (
                <Button
                  className={buttonTypes.cancelButton}
                  style={
                    movil
                      ? { width: "100%", color: "red" }
                      : { width: "30%", color: "#d72424" }
                  }
                  onClick={() => setConfModal(true)}
                >
                  Comenzar desde cero
                </Button>
              ) : (
                <Button
                  className={buttonTypes.cancelButton}
                  style={movil ? { width: "100%" } : { width: "30%" }}
                  onClick={() => navigate.push("/mis-negocios")}
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                className={buttonTypes.saveButton}
                style={
                  movil
                    ? { width: "100%", marginTop: "1.5rem" }
                    : { width: "30%", marginLeft: "1.5rem" }
                }
              >
                {isMainPage ? "Guardar cambios y continuar" : "Guardar cambios"}
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                className={buttonTypes.button}
                style={movil ? { width: "100%" } : { width: "30%" }}
              >
                Continuar
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </FormikForm>
  );
}
