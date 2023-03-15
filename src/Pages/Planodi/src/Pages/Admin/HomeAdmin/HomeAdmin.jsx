import React, { useEffect, useState } from "react";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import { toast } from "react-toastify";

import "../Admin.css";
import Loading from "../../../componentes/Loading/Loading";
import { Line } from "react-chartjs-2";
import { FcApproval } from "react-icons/fc";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const buttonBox = makeStyles(() => ({
  buttonIcon: {
    color: "white",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "#8c50ff",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const halagos = [
  "crack",
  "maquina",
  "mastodonte",
  "tifón",
  "fiera",
  "titan",
  "jefe",
  "maestro",
  "crack, maquina, fiera, jefe, tifón, numero 1, figura, mostro, mastodonte, toro, furia, ciclón, tornado, artista, fenómeno, campeón, maestro, torero, socio..",
];

export default function HomeAdmin({ checkIfIsAdmin }) {
  const [loading, setLoading] = useState(false);
  const [negocios, setNegocios] = useState(undefined);
  const [halago, setHalago] = useState(halagos[0]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalAliados, setTotalAliados] = useState(0);
  const [semanas, setSemanas] = useState([]);
  const [aliadosPorSemana, setAliadosPorSemana] = useState([]);
  const classes = buttonBox();
  const movil = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    checkIfIsAdmin();
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }admin/home`,
        userHeaders(false)
      )
      .then((res) => {
        const {
          aliadosPorVerificar,
          aliadosPorSemana,
          semanas,
          totalUsuarios,
          totalAliados,
        } = res.data;
        setNegocios(aliadosPorVerificar);
        setSemanas(semanas);
        setAliadosPorSemana(aliadosPorSemana);
        setTotalUsuarios(totalUsuarios);
        setTotalAliados(totalAliados);
        setHalago(halagos[Math.floor(Math.random() * halagos.length)]);
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
  }, []);

  const onApprove = (idAliado) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/validarNegocio`,
        { idAliado },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Parece que hubo un error al validar el negocio!", {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return !negocios || loading ? (
    <Loading helperText="Cargando..." />
  ) : (
    <div className="admin-wrapper">
      <div className="admin-content-wrp">
        <p className="admin-title">Bienvenido, {halago}.</p>
        {negocios.length > 0 && (
          <>
            <p className="admin-subtitle">
              Negocios nuevos por validar para que puedan ser vistos por los
              clientes.
            </p>
            <table className="table-admin">
              <thead>
                <tr>
                  <th>Id</th>

                  <th>Nombre</th>

                  <th>Validar</th>
                </tr>
              </thead>

              <tbody>
                {negocios.map((negocio) => (
                  <tr key={negocio.idAliado}>
                    <td>{negocio.idAliado}</td>

                    <td>
                      <a
                        href={`/negocios/${negocio.pathUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {negocio.nombre}
                      </a>
                    </td>

                    <td style={{ alignItems: "center" }}>
                      <button
                        className={classes.buttonIcon}
                        onClick={() => onApprove(negocio.idAliado)}
                      >
                        <FcApproval />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {semanas.length && aliadosPorSemana.length ? (
          <div className="admin-home-plot">
            <div className="admin-home-plot-div">
              <Line
                data={{
                  labels: semanas,
                  datasets: [
                    {
                      label: "Aliados registrados en el último mes",
                      data: aliadosPorSemana,
                      backgroundColor: "rgba(75,192,192,0.2)",
                      borderColor: "rgba(75,192,192,1)",
                    },
                  ],
                }}
                height={movil ? 8 : 5}
                width={10}
                options={{
                  scales: {
                    x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "# de semana",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "# de aliados",
                      },
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="admin-home-plot-div">
              <p className="admin-home-totales-title">Totales:</p>
              <div className="admin-home-totales">
                <div className="admin-home-totales-box">
                  <p className="admin-home-totales-num">{totalAliados}</p>
                  <p className="admin-home-totales-desc">Aliados</p>
                </div>
                <div className="admin-home-totales-box">
                  <p className="admin-home-totales-num">{totalUsuarios}</p>
                  <p className="admin-home-totales-desc">usuarios</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
