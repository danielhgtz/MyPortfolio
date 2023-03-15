import React from "react";
import { fade } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import "./PasoForm.css";

export const botonesAtrasYAdelante = makeStyles(() => ({
  button: {
    backgroundColor: "#3b3b3b",
    color: "white",
    textTransform: "none",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "#535353",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
  },
  saveButton: {
    backgroundColor: "#8c50ff",
    color: "white",
    textTransform: "none",
    padding: "12px 24px",
    border: "1px solid #8c50ff",
    "&:hover": {
      backgroundColor: "rgba(140,80,255,0.9)",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#3b3b3b",
    border: "1px solid #3b3b3b",
    textTransform: "none",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "rgba(246,246,246,0.9)",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
  },
  buttonAtras: {
    marginRight: "1rem",
    backgroundColor: "transparent",
    color: "#fdc70b",
    textTransform: "none",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: fade("#face39", 0.2),
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function PasoForm() {
  return <h1>hola</h1>;
}
