import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as yup from "yup";

import "./ModalNewReview.css";
import axios from "axios";
import { Form, Formik } from "formik";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { alpha } from "@material-ui/core";
import MyLongText from "../../../../../componentes/formikInputs/MyLongText/MyLongText";
import ErrorMsg from "../../../../../componentes/ErrorMsg";
import { IoStar, IoStarOutline } from "react-icons/io5/index";
import MyCheckbox from "../../../../../componentes/formikInputs/MyCheckbox/MyCheckbox";
import { userHeaders } from "../../../../../Utils/headerSetter";
import DotLoading from "../../../../../componentes/DotLoading/DotLoading";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "10px",
    fontSize: "1rem",
    backgroundColor: "#3b3b3b",
    color: "white",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: alpha("#3b3b3b", 0.9),
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalNewReview({
  handleClose,
  open,
  idAliado,
  idUser,
  setReloadInfo,
}) {
  const mobile = useMediaQuery("(max-width:400px)");
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error desconocido");
  const [textRating, setTextRating] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverTextRating, setHoverTextRating] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [errorStars, setErrorStars] = useState(false);
  const [errorDisclaimer, setErrorDisclaimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    comment: yup
      .string()
      .required("Este campo es requerido")
      .min(10, "La langitud mínima son 10 caracteres.")
      .max(499, "No debe exceder los 500 caracteres."),
    disclaimer: yup.boolean().oneOf([true], "Debes leer y aceptar este campo"),
  });

  const handleHoverRating = (score, scoreText) => {
    setHoverRating(score);
    setHoverTextRating(scoreText);
  };
  const handleRating = (score, scoreText) => {
    if (score === rating) {
      setRating(0);
      setTextRating("");
    } else {
      setRating(score);
      setTextRating(scoreText);
    }
  };

  return (
    <Dialog
      onClose={() => {
        if (!loading) {
          handleClose();
          setRating(0);
          setHoverRating(0);
          setHoverTextRating("");
          setErrorStars(false);
          setErrorDisclaimer(false);
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
      fullScreen={mobile}
      style={{ minWidth: "320px" }}
      className="modal-package-wrp-gen"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => {
          if (!loading) {
            handleClose();
            setRating(0);
            setHoverRating(0);
            setHoverTextRating("");
            setErrorStars(false);
            setErrorDisclaimer(false);
          }
        }}
        style={{
          padding: "1.6rem",
          position: "relative",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => {
            if (!loading) {
              handleClose();
              setRating(0);
              setHoverRating(0);
              setHoverTextRating("");
              setErrorStars(false);
              setErrorDisclaimer(false);
            }
          }}
          style={{
            position: "absolute",
            right: "6px",
            top: "3px",
          }}
          className="modal-reg-titulo"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers style={{ minHeight: "400px" }}>
        <Formik
          initialValues={{
            comment: "",
            disclaimer: false,
          }}
          initialTouched={{
            comment: false,
            disclaimer: false,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          validate={(values) => {
            if (!values.disclaimer) {
              setErrorDisclaimer(true);
            }
            if (rating === 0) {
              setErrorStars(true);
            }
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            if (rating !== 0) {
              const { comment } = data;

              axios
                .post(
                  `${
                    process.env.REACT_APP_ENV === "development"
                      ? process.env.REACT_APP_API_LOCAL
                      : process.env.REACT_APP_API_PROD
                  }user/newReview`,
                  { comment, idAliado, idUser, rating },
                  userHeaders()
                )
                .then(() => {
                  setLoading(false);
                  setSubmitting(false);
                  setReloadInfo((prevState) => prevState + 1);
                  toast.success("Se agregó tu comentario con éxito!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  handleClose();
                })
                .catch((e) => {
                  setLoading(false);
                  const { response } = e;
                  if (response && response.data && response.data.msg) {
                    if (response.data.msg) setErrorMsg(response.data.msg);
                  }
                  setError(true);
                });
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting, isValid, errors, touched }) => (
            <>
              {loading ? (
                <DotLoading />
              ) : (
                <Form autoComplete="off">
                  {error ? (
                    <ErrorMsg setError={setError} errorMsg={errorMsg} />
                  ) : null}
                  <div className="modal-new-review-wrp">
                    <div className="modal-new-review-input">
                      <p className="modal-new-review-title">
                        Califica tu experiencia
                      </p>
                      <div
                        style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                        className="modal-new-review-stars-flex"
                      >
                        <div
                          onMouseEnter={() => handleHoverRating(1, "Pésimo")}
                          onMouseLeave={() =>
                            handleHoverRating(rating, textRating)
                          }
                          onClick={() => handleRating(1, "Pésimo")}
                        >
                          {rating >= 1 || hoverRating >= 1 ? (
                            <IoStar className="modal-new-review-star-input-active" />
                          ) : (
                            <IoStarOutline className="modal-new-review-star-input" />
                          )}
                        </div>
                        <div
                          onMouseEnter={() => handleHoverRating(2, "Mal")}
                          onMouseLeave={() =>
                            handleHoverRating(rating, textRating)
                          }
                          onClick={() => handleRating(2, "Mal")}
                        >
                          {rating >= 2 || hoverRating >= 2 ? (
                            <IoStar className="modal-new-review-star-input-active" />
                          ) : (
                            <IoStarOutline className="modal-new-review-star-input" />
                          )}
                        </div>
                        <div
                          onMouseEnter={() => handleHoverRating(3, "Promedio")}
                          onMouseLeave={() =>
                            handleHoverRating(rating, textRating)
                          }
                          onClick={() => handleRating(3, "Promedio")}
                        >
                          {rating >= 3 || hoverRating >= 3 ? (
                            <IoStar className="modal-new-review-star-input-active" />
                          ) : (
                            <IoStarOutline className="modal-new-review-star-input" />
                          )}
                        </div>
                        <div
                          onMouseEnter={() => handleHoverRating(4, "Muy bien")}
                          onMouseLeave={() =>
                            handleHoverRating(rating, textRating)
                          }
                          onClick={() => handleRating(4, "Muy bien")}
                        >
                          {rating >= 4 || hoverRating >= 4 ? (
                            <IoStar className="modal-new-review-star-input-active" />
                          ) : (
                            <IoStarOutline className="modal-new-review-star-input" />
                          )}
                        </div>
                        <div
                          onMouseEnter={() => handleHoverRating(5, "Excelente")}
                          onMouseLeave={() =>
                            handleHoverRating(rating, textRating)
                          }
                          onClick={() => handleRating(5, "Excelente")}
                        >
                          {rating === 5 || hoverRating === 5 ? (
                            <IoStar className="modal-new-review-star-input-active" />
                          ) : (
                            <IoStarOutline className="modal-new-review-star-input" />
                          )}
                        </div>
                        <div className="modal-new-review-star-rating-text-wrp">
                          <div className="modal-new-review-star-rating-text-p">
                            {hoverTextRating}
                          </div>
                        </div>
                      </div>
                      {/*<pre>{JSON.stringify(touched, null, 2)}</pre>*/}
                      {errorStars && rating === 0 && (
                        <p className="modal-new-review-star-input-errorMsg">
                          Debes poner una calificación
                        </p>
                      )}
                    </div>
                    <div className="modal-new-review-input">
                      <p className="modal-new-review-title">
                        Escribe tu reseña
                      </p>
                      <MyLongText
                        name="comment"
                        type="input"
                        placeholder="Cuentales a las personas sobre tu experiencia con este aliado, ¿estuvo bien? ¿hubo algo que no te gustó? ¿estuvo excelente?..."
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div
                      className="modal-new-review-input"
                      style={{ marginTop: "1.5rem" }}
                    >
                      <MyCheckbox
                        name="disclaimer"
                        isValid={
                          isValid || values.disclaimer || !touched.disclaimer
                        }
                      >
                        <label
                          htmlFor="disclaimer"
                          className="modal-new-review-star-input-disclaimer"
                        >
                          Certifico que esta reseña se basa en mi propia
                          experiencia y es mi opinión sobre este aliado y que no
                          tengo ninguna relación con este aliado, y que no se me
                          ha ofrecido ningún incentivo o pago procedente del
                          aliado para escribir esta reseña. Entiendo que Planodi
                          tiene una política de tolerancia cero con las reseñas
                          falsas.
                        </label>
                      </MyCheckbox>
                      {errorDisclaimer && !values.disclaimer && (
                        <p className="modal-new-review-star-input-errorMsg">
                          Debes leer y aceptar este campo
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      className={classes.button}
                      type="submit"
                      disabled={isSubmitting}
                      style={{ width: "100%", margin: "1.5rem 0" }}
                    >
                      Agregar tu reseña
                    </Button>
                  </div>
                </Form>
              )}
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
