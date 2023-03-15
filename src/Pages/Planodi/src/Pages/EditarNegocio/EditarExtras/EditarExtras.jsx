import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io/index";
import { botonesAtrasYAdelante } from "../../../componentes/pasos/PasoForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import Slider from "@material-ui/core/Slider";
import {
  numberToPrecio,
  numberToPrecioStr,
} from "../../../componentes/pasos/PasoUrl/PasoUrl";
import Button from "@material-ui/core/Button";

import "./EditarExtras.css";
import ErrorMsg from "../../../componentes/ErrorMsg";

const Inputs = ({
  handleChange,
  handleSubmit,
  precio,
  buttonTypes,
  mobile,
  navigate,
}) => (
  <div>
    <p className="edit-extras-instruc" style={{ marginBottom: "1rem" }}>
      Clasifica tus servicios en un rango de precio:
    </p>
    <div className="edit-extras-precio-slider-flex">
      <div className="edit-extras-precio-slider">
        <Slider
          step={1}
          marks
          min={1}
          max={9}
          value={precio}
          onChange={handleChange}
        />
      </div>
      <p className="edit-extras-precio-slider-p">{numberToPrecio[precio]}</p>
      <p className="edit-extras-precio-slider-p2">
        ({numberToPrecioStr[precio]})
      </p>
    </div>
    <div className="edit-extras_soc_btns">
      <Button
        className={buttonTypes.cancelButton}
        style={mobile ? { width: "100%" } : { width: "30%" }}
        onClick={() => navigate.push("/mis-negocios")}
      >
        Cancelar
      </Button>
      <Button
        onClick={handleSubmit}
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
  </div>
);

export default function EditarExtras({
  isCollapsible,
  isSelected,
  setIsSelected,
  idAliado,
  initialPrecio,
}) {
  const [collapse, setCollapse] = useState(!isSelected);
  const [precio, setPrecio] = useState(initialPrecio);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, intetnalo más tarde"
  );

  const buttonTypes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setPrecio(newValue);
  };

  const handleSubmit = () => {
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updateExtras`,
        {
          idAliado,
          precio: numberToPrecio[precio],
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
        setError(true);
      });
  };

  return (
    <>
      {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
      {mobile ? (
        <>
          <p
            className="edit-extras_titulo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(9);
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
            Extras
          </p>

          {(!collapse || !isCollapsible) && (
            <Inputs
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              precio={precio}
              buttonTypes={buttonTypes}
              mobile={mobile}
              navigate={navigate}
            />
          )}
        </>
      ) : (
        <>
          <p className="edit-extras_titulo">Extras:</p>
          <Inputs
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            precio={precio}
            buttonTypes={buttonTypes}
            mobile={mobile}
            navigate={navigate}
          />
        </>
      )}
    </>
  );
}
