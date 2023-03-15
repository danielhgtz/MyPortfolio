import "./MisNegocios.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

import Navbar from "../HomePage/Navbar/Navbar";
import addButton from "../../Assets/img/buttonAdd3.webp";
import Loading from "../../componentes/Loading/Loading";
import Packages from "../../componentes/Packages/Packages";
import { FiEdit2 } from "react-icons/fi";
import { userHeaders } from "../../Utils/headerSetter";

export default function MisNegocios() {
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [negocios, setNegocios] = useState(undefined);

  useEffect(() => {
    if (!stateUser?.userInfo?.isAlly) navigate.push("/afiliarme");
    else if (!negocios)
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/getMisNegocios?userId=${stateUser.userInfo.id}`,
          userHeaders(false)
        )
        .then((res) => {
          setNegocios(res.data);
        })
        .catch(() => {
          setNegocios([]);
          toast.error("Parece que hubo un error al leer tus negocios!", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
  }, [navigate, stateUser, negocios]);

  return !negocios ? (
    <Loading helperText="Cargando..." />
  ) : (
    <div className="minegocio-wrapper">
      <div style={{ width: "100%", minWidth: "320px" }}>
        <Navbar type="black" shadow />
      </div>
      <div className="minegocio-content-wrp">
        <div
          style={{
            width: "100%",
            position: "relative",
            minHeight: "400px",
            marginBottom: "5rem",
            marginTop: "3rem",
          }}
        >
          <p className="minegocio-title">Mis Negocios</p>
          <p className="minegocio-subtitle">
            En esta pantalla puedes visualizar todos tus negocios registrados.
            Da click sobre ellos para editarlos.
          </p>

          <section className="grid-packages">
            {negocios.map((negocio) => (
              <div className="item" key={negocio.idAliado}>
                <Packages
                  onClickFunction={() =>
                    navigate.push(`/mis-negocios/${negocio.pathUrl}?opcion=0`)
                  }
                  width="300px"
                  label={
                    <span>
                      <FiEdit2 style={{ margin: "0 5px 5px 0" }} />
                      EDITAR
                    </span>
                  }
                  cardInfo={{
                    name: negocio.nombre,
                    id: negocio.idAliado,
                    mainImage: negocio.imageUrl,
                  }}
                  onClickVerMas={() => {}}
                />
              </div>
            ))}
            <div className="item">
              <div
                className="create-package-button-mis-negocios"
                onClick={() => navigate.push("/afiliarme")}
              >
                <img
                  src={addButton}
                  alt="button"
                  className="create-package-button-img-mis-negocios"
                  style={{ width: "300px" }}
                />
                <p className="create-package-button-p-mis-negocios">
                  Afilia un nuevo negocio
                </p>
                <IoIosAddCircleOutline className="create-package-button-icon-mis-negocios" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
