import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./PaqueteBoxInputs.css";

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

const useStyles = makeStyles(() => ({
  button: {
    padding: "0",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#b604fd",
    position: "absolute",
    right: "0",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#8000b3",
    },
  },
  cssLabel: {
    color: "#6628ef",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#6628ef !important",
  },
}));

/**
 * COmponente de Paquetes
 */

export default function PaqueteBoxInputs({
  info,
  setInfo,
  selected,
  setSelected,
  setNumPaquetes,
  setMostrarAyudaMas,
}) {
  const [activo, setActivo] = useState(true);
  const [valuePrecio, setValuePrecio] = useState(info[selected].precio);
  const movil = useMediaQuery("(max-width:960px)");
  const [precioHelp, setPrecioHelp] = useState(true);
  const [contenidoHelp, setContenidoHelp] = useState(false);
  const [valueContenido, setValueContenido] = useState(
    info[selected].contenido.join()
  );
  const [primerFocus, setPrimerfocus] = useState(true);

  const handleChange = (event) => {
    if (event.target.name === "numberformat") {
      setValuePrecio(event.target.value);
      info[selected].precio = event.target.value;
    }
    if (event.target.name === "contenido") {
      setValueContenido(event.target.value);
      info[selected].contenido = event.target.value.split(",");
    }
    setInfo(info);
    if (
      info.length === 1 &&
      info[0].precio !== "0" &&
      info[0].contenido.join() !== "50 personas,6 horas,etc."
    ) {
      setMostrarAyudaMas(true);
    }
  };

  useEffect(() => {
    if (info[selected].numero === 1) {
      setActivo(true);
    }
  }, []);

  useEffect(() => {
    setValueContenido(info[selected].contenido);
    setValuePrecio(info[selected].precio);
  }, [selected]);
  const classes = useStyles();
  return (
    <div
      className={`${activo ? "activo" : ""} temp1-precio-box`}
      style={{ position: "relative" }}
    >
      {selected === 0 ? null : (
        <div
          className="paquetes-delete"
          onClick={() => {
            setSelected(selected - 1);
            info.splice(selected, 1);
            setInfo(info);
          }}
        >
          <ClearIcon style={{ fontSize: "1.7rem" }} />{" "}
          <span
            style={{
              fontWeight: 400,
              marginTop: "0.1rem",
              marginRight: "0.4rem",
            }}
          >
            Eliminar
          </span>
        </div>
      )}
      <div style={{ position: "relative", marginBottom: "3rem" }}>
        <p
          className={`${activo ? "activo" : ""} box-numero-paquete-pasos`}
          style={{ fontSize: "1.3rem" }}
        >
          PAQUETE {info[selected].numero}
        </p>
        <Button
          className={`paqueteBox-bt ${classes.button}`}
          style={activo ? { display: "none" } : {}}
          onClick={() => setActivo(true)}
        >
          Ver más <ChevronLeftIcon style={{ marginBottom: "0.2rem" }} />
        </Button>
      </div>
      <div>
        <Grid container sm={12} style={{ position: "relative" }}>
          <Grid item xs={12}>
            <div className="paqueteBox-precio">
              <TextField
                label="Precio (Ej. 500)"
                variant="outlined"
                size="medium"
                style={{
                  marginBottom: "3rem",
                  width: "100%",
                }}
                value={valuePrecio}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={
                  primerFocus
                    ? {
                        inputComponent: NumberFormatCustom,
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                      }
                    : {
                        inputComponent: NumberFormatCustom,
                      }
                }
                InputLabelProps={
                  primerFocus
                    ? {
                        classes: {
                          root: classes.cssLabel,
                        },
                      }
                    : {}
                }
                onBlur={() => {
                  setPrecioHelp(false);
                }}
                onFocus={() => {
                  setPrecioHelp(true);
                  setPrimerfocus(false);
                }}
              />
              {precioHelp ? (
                <p
                  className="helper-text-input"
                  style={
                    movil
                      ? { opacity: "0.9", marginTop: "1rem" }
                      : { opacity: "0.9", maxWidth: "30rem" }
                  }
                >
                  💡 Ingresa el precio exacto de este paquete.
                </p>
              ) : null}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginBottom: "0.5rem",
              marginTop: "-0.7rem",
              position: "relative",
            }}
          >
            <TextField
              label="Contenido"
              variant="outlined"
              style={{
                width: "100%",
                marginBottom: "1rem",
              }}
              size="medium"
              name="contenido"
              value={valueContenido}
              onChange={handleChange}
              onBlur={() => {
                setContenidoHelp(false);
              }}
              onFocus={() => {
                setContenidoHelp(true);
                setPrimerfocus(false);
                setPrecioHelp(false);
              }}
            />
            {contenidoHelp ? (
              <p
                className="helper-text-input"
                style={
                  movil
                    ? { opacity: "0.9", marginTop: "-1rem" }
                    : { opacity: "0.9", maxWidth: "30rem" }
                }
              >
                💡 Dile a tu cliente qué incluye este paquete. Hazlo de la forma
                más breve posible. Separa el contenido por comas. Ej: "6
                horas,50 personas"
              </p>
            ) : null}
            {info[selected].contenido.map((item) => (
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  display: "inline",
                }}
              >
                <FiberManualRecordIcon
                  style={{
                    fontSize: "0.5rem",
                    margin: "0 0.15rem 0.15rem 0.15rem",
                  }}
                />
                {item}
              </p>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
