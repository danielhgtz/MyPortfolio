import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Form as FormikForm } from "formik";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import MyTextField from "../../formikInputs/MyTextField/MyTextField";
import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../PasoForm";
import "./PasoInfoGeneral.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MyLongText from "../../formikInputs/MyLongText/MyLongText";
import MyCheckbox from "../../formikInputs/MyCheckbox/MyCheckbox";
import PoolIcon from "@material-ui/icons/Pool";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

export default function FormInfoGeneralTerraza({
  errors,
  isEdition,
  isMainPage,
}) {
  const navigate = useNavigate();

  const buttonTypes = botonesAtrasYAdelante();
  const movil = useMediaQuery("(max-width:960px)");

  return (
    <FormikForm style={{ width: "100%" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "1rem" }
              : { padding: "1rem 0 1rem 1rem", marginTop: "1rem" }
          }
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Capacidad*{" "}
            <span className="alaido-form-label2">
              (ingresa rango de personas)
            </span>
          </p>
          <MyTextField
            name="capacidad"
            placeholder="Ej. 50"
            style={{
              width: "45%",
              float: "left",
              margin: "0",
            }}
          />
          <p
            style={{
              float: "left",
              margin: "1rem 0rem 0 0",
              width: "10%",
              textAlign: "center",
            }}
          >
            -
          </p>
          <MyTextField
            name="capacidad2"
            placeholder="Ej. 100"
            style={{ width: "45%", float: "left", margin: "0" }}
          />
          {/*<p*/}
          {/*  style={{*/}
          {/*    textAlign: "center",*/}
          {/*    marginTop: "5.5rem",*/}
          {/*    marginBottom: "0",*/}
          {/*    fontSize: "0.9rem",*/}
          {/*    color: "#99d227",*/}
          {/*  }}*/}
          {/*  className="alaido-form-label2"*/}
          {/*>*/}
          {/*  De {values.capacidad !== "" ? values.capacidad : "-"} a{" "}*/}
          {/*  {values.capacidad2 !== "" ? values.capacidad2 : "-"} personas*/}
          {/*</p>*/}
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "2rem" }
              : { padding: "1rem 0 1rem 1rem" }
          }
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Descripción*{" "}
            <span className="alaido-form-label2">
              Cuéntanos sobre tu negocio, ¡es tu espacio para convencer a los
              clientes de que eres su mejor opción! Una buena descripción ayuda
              a destacar tu negocio.
            </span>
          </p>
          <MyLongText
            name="descripcion"
            placeholder="Ejemplo: Somos el lugar perfecto para festejar un evento memorable. Contamos con múltiples opciones..."
            rows={5}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "2rem" }
              : { padding: "1rem 0 1rem 1rem" }
          }
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Servicios*{" "}
            <span className="alaido-form-label2">
              Cuéntanos qué puede ofrecer tu empresa, ¿qué servicios adicionales
              puedes ofrecerles a tus clientes?
            </span>
          </p>
          <MyLongText
            name="servicios"
            placeholder="Ejemplo: Además de un excelente espacio ofrecemos servicios adicionales como: meseros, banquetes, fotografía, video..."
            rows={5}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "2rem" }
              : { padding: "1rem 0 1rem 1rem" }
          }
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Espacios*{" "}
            <span className="alaido-form-label2">
              Cuéntanos sobre los espacios del lugar, ¿es al aire libre?, ¿Hay
              estcionamiento?, ¿Cuántos baños?, etc.
            </span>
          </p>
          <MyLongText
            name="espacios"
            placeholder="Ejemplo: La salón cuenta con una amplia explanada perfecta para colocar una pista de baile..."
            rows={5}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "2rem" }
              : { padding: "1rem 0 1rem 1rem" }
          }
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Dirección*{"  "}
            <span className="alaido-form-label2">
              ¿Dónde se encuentra ubicado?
            </span>
          </p>
          <MyLongText
            name="direccion"
            placeholder=""
            rows={3}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="postion-rel"
          style={movil ? { marginTop: "2rem" } : { padding: "1rem 0 0 1rem" }}
        >
          <p style={{ margin: "0 0 0.5rem 0" }} className="alaido-form-label1">
            Selecciona las opciones que tenga tu terraza o salón de eventos
          </p>
        </Grid>
        <Grid item>
          <MyCheckbox name="alcohol" isValid>
            <label
              style={{ display: "inline", marginLeft: "0.5rem" }}
              htmlFor="alcohol"
            >
              <LocalBarIcon />
              Permiso para beber alcohol
            </label>
          </MyCheckbox>
        </Grid>
        <Grid item>
          <MyCheckbox name="eventosDia" isValid>
            <label
              style={{ display: "inline", marginLeft: "0.5rem" }}
              htmlFor="eventosDia"
            >
              <Brightness5Icon />
              Eventos de día
            </label>
          </MyCheckbox>
        </Grid>
        <Grid item>
          <MyCheckbox name="eventosNoche" isValid>
            <label
              style={{ display: "inline", marginLeft: "0.5rem" }}
              htmlFor="eventosNoche"
            >
              <Brightness2Icon />
              Eventos de noche
            </label>
          </MyCheckbox>
        </Grid>
        <Grid item>
          <MyCheckbox name="estacionamiento" isValid>
            <label
              style={{ display: "inline", marginLeft: "0.5rem" }}
              htmlFor="estacionamiento"
            >
              <DriveEtaIcon />
              Estacionamiento
            </label>
          </MyCheckbox>
        </Grid>
        <Grid item>
          <MyCheckbox name="alberca" isValid>
            <label
              style={{ display: "inline", marginLeft: "0.5rem" }}
              htmlFor="alberca"
            >
              <PoolIcon />
              Alberca
            </label>
          </MyCheckbox>
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
              <Button
                className={buttonTypes.cancelButton}
                style={movil ? { width: "100%" } : { width: "30%" }}
                onClick={() =>
                  navigate.push(isMainPage ? "?paso=1" : "/mis-negocios")
                }
              >
                {isMainPage ? "Regresar" : "Cancelar"}
              </Button>
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
              {Object.keys(errors).length > 0 ? (
                <p
                  style={{
                    color: "#f44336",
                    fontFamily: "Roboto",
                    marginTop: "0.5rem",
                    fontSize: "14px",
                  }}
                >
                  Faltan algunos campos por llenar. Los campos con (*) son
                  obligatorios.
                </p>
              ) : null}
            </Grid>
          ) : (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                className={buttonTypes.cancelButton}
                style={
                  movil
                    ? { width: "100%", marginBottom: "1rem" }
                    : { width: "30%", marginRight: "1rem" }
                }
                onClick={() => navigate.push("?paso=1")}
              >
                Regresar
              </Button>
              <Button
                type="submit"
                className={buttonTypes.button}
                style={movil ? { width: "100%" } : { width: "30%" }}
              >
                Continuar
              </Button>
              {Object.keys(errors).length > 0 ? (
                <p
                  style={{
                    color: "#f44336",
                    fontFamily: "Roboto",
                    marginTop: "0.5rem",
                    fontSize: "14px",
                  }}
                >
                  Faltan algunos campos por llenar. Los campos con (*) son
                  obligatorios.
                </p>
              ) : null}
            </Grid>
          )}
        </Grid>
      </Grid>
    </FormikForm>
  );
}
