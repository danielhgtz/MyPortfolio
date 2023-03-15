import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import "./EditarRedesSociales.css";
import Button from "@material-ui/core/Button";
import { Form, Formik } from "formik";
import MyTextField from "../../../componentes/formikInputs/MyTextField/MyTextField";
import { botonesAtrasYAdelante } from "../../../componentes/pasos/PasoForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";

const InputsRedesSociales = ({
  initialValues,
  buttonTypes,
  navigate,
  mobile,
  handleSubmit,
}) => (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className="res_paq_in_cel">
      <p className="editar_red_soc_desc">
        Ingresa los links de las redes sociales de tu negocio.
      </p>
      <p className="editar_red_soc_input_desc">Instagram</p>
      <MyTextField
        name="instagram"
        type="input"
        placeholder="https://www.instagram..."
        style={{ width: "100%", paddingRight: "10px" }}
      />
      <p className="editar_red_soc_input_desc">Facebook</p>
      <MyTextField
        name="facebook"
        type="input"
        placeholder="https://www.facebook..."
        style={{ width: "100%", paddingRight: "10px" }}
      />
      <p className="editar_red_soc_input_desc">Youtube</p>
      <MyTextField
        name="youtube"
        type="input"
        placeholder="https://www.youtube..."
        style={{ width: "100%", paddingRight: "10px" }}
      />

      <div className="editar_red_soc_btns">
        <Button
          className={buttonTypes.cancelButton}
          style={mobile ? { width: "100%" } : { width: "30%" }}
          onClick={() => navigate.push("/mis-negocios")}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className={buttonTypes.saveButton}
          style={
            mobile
              ? { width: "100%", marginBottom: "1.5rem" }
              : { width: "30%", marginLeft: "1.5rem" }
          }
        >
          Guardar cambios
        </Button>
      </div>
    </Form>
  </Formik>
);

export default function EditarRedesSociales({
  isCollapsible,
  isSelected,
  setIsSelected,
  idAliado,
  instagram,
  facebook,
  youtube,
}) {
  const initialValues = {
    facebook: facebook ? facebook : "",
    instagram: instagram ? instagram : "",
    youtube: youtube ? youtube : "",
  };

  const [collapse, setCollapse] = useState(!isSelected);

  const buttonTypes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updateSocialMedia`,
        {
          idAliado,
          facebook: data.facebook,
          instagram: data.instagram,
          youtube: data.youtube,
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        console.log("ERROR");
      });
  };

  return (
    <>
      {mobile ? (
        <>
          <p
            className="editar_red_soc_titulo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(8);
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
            Redes sociales
          </p>

          {(!collapse || !isCollapsible) && (
            <InputsRedesSociales
              buttonTypes={buttonTypes}
              navigate={navigate}
              mobile={mobile}
              handleSubmit={handleSubmit}
            />
          )}
        </>
      ) : (
        <>
          <p className="editar_red_soc_titulo">Redes sociales:</p>
          <InputsRedesSociales
            buttonTypes={buttonTypes}
            navigate={navigate}
            mobile={mobile}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
          />
        </>
      )}
    </>
  );
}
