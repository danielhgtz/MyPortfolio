import React, { useEffect, useState } from "react";
import AdminLayout from "../../../componentes/AdminLayout/AdminLayout";

import "./RankingScore.css";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import { botonesMoradoNegroRojo } from "../../../componentes/Packages/ModalPackage/CreatePagesInPackages";

export default function RankingScore({ checkIfIsAdmin }) {
  const [loading, setLoading] = useState(true);
  const [scoresAliados, setScoresAliados] = useState(null);
  const [aliadoSelected, setAliadoSelected] = useState(null);
  const [scoreInput, setScoreInput] = useState("");

  const botonesClasses = botonesMoradoNegroRojo();

  useEffect(() => {
    checkIfIsAdmin();
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }admin/scoresAliados`,
        userHeaders(false)
      )
      .then((res) => {
        const { aliadosScores } = res.data;
        setScoresAliados(aliadosScores);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Parece que hubo un error obteniendo scores!", {
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

  useEffect(() => {
    setScoreInput(aliadoSelected?.rankingScore?.toString());
  }, [aliadoSelected]);

  const updateScore = () => {
    checkIfIsAdmin();
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }admin/updateScore`,
        { id: aliadoSelected.id, newScore: scoreInput },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Parece que hubo un error", {
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

  return (
    <AdminLayout loading={loading}>
      <div className="admin-rank-div1">
        <p>
          En esta página se puede modificar el score del aliado, lo cual impacta
          directamente a su posición en los resultados.
        </p>
        <Autocomplete
          value={aliadoSelected}
          inputValue={aliadoSelected?.pathUrl}
          onChange={(event, value) => setAliadoSelected(value)}
          options={scoresAliados}
          getOptionLabel={(option) => option.pathUrl}
          style={{ width: "300px", marginBottom: "0.5rem" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Username de aliado"
              variant="outlined"
            />
          )}
        />
        <TextField
          variant="outlined"
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
          disabled={!aliadoSelected}
          style={{ width: "140px" }}
        />
        <Button
          className={botonesClasses.buttonPurp}
          style={{ width: "140px", marginLeft: "20px" }}
          disabled={!aliadoSelected}
          onClick={updateScore}
        >
          Actualizar
        </Button>
      </div>
      {scoresAliados ? (
        <table className="admin-rank-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Score</th>
              <th>Top</th>
            </tr>
          </thead>
          <tbody>
            {scoresAliados.map((item, idx) => (
              <tr key={item.id} onClick={() => setAliadoSelected(item)}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.pathUrl}</td>
                <td>{item.rankingScore}</td>
                <td>{idx + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </AdminLayout>
  );
}
