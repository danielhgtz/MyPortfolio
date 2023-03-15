import React, { useState } from "react";

import "./EditarVideos.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Form, Formik } from "formik";
import MyTextField from "../../../componentes/formikInputs/MyTextField/MyTextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ErrorMsg from "../../../componentes/ErrorMsg";
import Loading from "../../../componentes/Loading/Loading";
import { MdDeleteForever } from "react-icons/md";

const buttonAdd = makeStyles(() => ({
  button: {
    backgroundColor: "#3b3b3b",
    color: "white",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "0 10px 10px 0",
    marginLeft: "-1rem",
    "&:hover": {
      backgroundColor: "#464646",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const DisplayVideos = ({
  initialValues,
  handleSubmit,
  handleDelete,
  classAddVideoButton,
  error,
  setError,
  errorMsg,
  videos,
}) => (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className="res_paq_in_cel">
      <p className="editar_red_soc_desc">Ingresa el link del video:</p>
      {error ? (
        <ErrorMsg
          setError={setError}
          errorMsg={errorMsg}
          style={{ margin: "0 0.2rem 1rem 0.2rem" }}
        />
      ) : null}
      <div className="editar-vid-wrp-inputs">
        <MyTextField
          name="urlVideo"
          type="input"
          placeholder="https://www.youtube..."
          style={{ margin: 0, width: "calc(100% - 160px)" }}
        />
        <Button className={classAddVideoButton.button} type="submit">
          Agregar video
        </Button>
      </div>
      <p className="editar_red_soc_desc" style={{ marginTop: "2rem" }}>
        Videos agregados:
      </p>
      <div className="editar-vid-videos">
        {videos.map((item) => (
          <div className="editar-vid-videos-section" key={item}>
            <div className="editar-vid-videos-section-cover" />
            <div
              className="editar-vid-videos-section-delete"
              onClick={() => handleDelete(item)}
            >
              <MdDeleteForever />
            </div>
            <iframe
              width="200"
              height="150"
              src={`https://www.youtube.com/embed/${item}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </Form>
  </Formik>
);

export default function EditarVideos({
  isCollapsible,
  isSelected,
  setIsSelected,
  idAliado,
  videos,
}) {
  const initialValues = {
    urlVideo: "",
  };

  const [collapse, setCollapse] = useState(!isSelected);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error subiendo video");

  const classAddVideoButton = buttonAdd();
  const mobile = useMediaQuery("(max-width:960px)");

  const handleSubmit = (data) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updateVideos`,
        {
          idAliado,
          urlVideo: data.urlVideo,
          action: "upload",
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        setError(true);
        if (e?.response?.data?.msg) {
          setErrorMsg(e?.response?.data?.msg);
        }
      });
  };

  const handleDelete = (urlCode) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/updateVideos`,
        {
          idAliado,
          urlVideo: urlCode,
          action: "delete",
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        setError(true);
        if (e?.response?.data?.msg) {
          setErrorMsg(e?.response?.data?.msg);
        }
      });
  };

  if (loading) {
    return <Loading helperText="Cargando..." />;
  }

  return (
    <>
      {mobile ? (
        <>
          <p
            className="editar_red_soc_titulo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(3);
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
            Agregar Videos
          </p>

          {(!collapse || !isCollapsible) && (
            <DisplayVideos
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              initialValues={initialValues}
              classAddVideoButton={classAddVideoButton}
              error={error}
              setError={setError}
              errorMsg={errorMsg}
              videos={videos}
            />
          )}
        </>
      ) : (
        <>
          <p className="editar_red_soc_titulo">Agregar Videos:</p>
          <DisplayVideos
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            initialValues={initialValues}
            classAddVideoButton={classAddVideoButton}
            error={error}
            setError={setError}
            errorMsg={errorMsg}
            videos={videos}
          />
        </>
      )}
    </>
  );
}
