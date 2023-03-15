import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Form as FormikForm } from "formik";
import Button from "@material-ui/core/Button";

import { botonesAtrasYAdelante } from "../PasoForm";
import MyLongText from "../../formikInputs/MyLongText/MyLongText";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function FormInfoGeneralProveedores({
  errors,
  isEdition,
  isMainPage,
  isAdminPage,
  backAdminPage,
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
          className="postion-rel"
          style={
            movil
              ? { padding: "0", marginTop: "1rem" }
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
            rows={5}
            style={{ width: "100%" }}
            placeholder="Ejemplo: Brindamos el mejor servicio de X para tu evento..."
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
            rows={5}
            style={{ width: "100%" }}
            placeholder="Ejemplo: Además de X ofrecemos servicios adicionales como: ..."
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
            Experiencia*{" "}
            <span className="alaido-form-label2">
              Cuéntanos sobre la experiencia de tu negocio ofreciendo este
              servicio
            </span>
          </p>
          <MyLongText
            name="experiencia"
            rows={5}
            style={{ width: "100%" }}
            placeholder="Ejemplo: Contamos con más de 10 años en el mercado de..."
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
            ¿Dónde ofrecen sus servicios?*{"  "}
            <span className="alaido-form-label2">
              Dinos en qué ciudades y si viajan a otras ciudades a dar el
              servicio
            </span>
          </p>
          <MyLongText
            name="dondeOfrecen"
            placeholder=""
            rows={3}
            style={{ width: "100%" }}
          />
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
                onClick={() => {
                  if (isAdminPage) {
                    backAdminPage();
                  } else {
                    navigate.push("?paso=1");
                  }
                }}
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
