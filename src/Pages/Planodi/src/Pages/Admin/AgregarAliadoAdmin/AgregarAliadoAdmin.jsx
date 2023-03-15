import React, { useEffect, useState } from "react";
import Loading from "../../../componentes/Loading/Loading";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./AgregarAliadoAdmin.css";
import Stepper2 from "../../../componentes/pasos/Stepper/Stepper2";
import PasoWelcome from "../../../componentes/pasos/PasoWelcome/PasoWelcome";
import PasoCategoria from "../../../componentes/pasos/PasoCategoria/PasoCategoria";
import PasoInfoGeneral from "../../../componentes/pasos/PasoInfoGeneral/PasoInfoGeneral";
import PasoTypeOfEvents from "../../../componentes/pasos/PasoTypeOfEvents/PasoTypeOfEvents";
import PasoFAQ from "../../../componentes/pasos/PasoFAQ/PasoFAQ";
import PasoSelectPlan from "../../../componentes/pasos/PasoPlan/PasoSelectPlan";
import PasoImagenes from "../../../componentes/pasos/PasoImagenes/PasoImagenes";
import PasoCreatePackages from "../../../componentes/pasos/PasoPaquetes/PasoCreatePackages";
import PasoUrl from "../../../componentes/pasos/PasoUrl/PasoUrl";
import PasoConfirmacion from "../../../componentes/pasos/PasoConfirmacion/PasoConfirmacion";
import { botonesAtrasYAdelante } from "../../../componentes/pasos/PasoForm";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import { toast } from "react-toastify";

export default function AgregarAliadoAdmin({ checkIfIsAdmin }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isTerraza, setIsTerraza] = useState(false);
  const [infoPlan, setInfoPlan] = useState({ cantidadDeFotos: 99 });
  const [username, setUsername] = useState("");
  const [infoAliado, setInfoAliado] = useState(null);
  const [infoGeneralTerraza, setInfoGeneralTerraza] = useState(null);
  const [infoGeneralProveedor, setInfoGeneralProveedor] = useState(null);
  const [eventosSeleccionados, setEventosSeleccionados] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [usernameInfo, setUsernameInfo] = useState(null);

  const mobile = useMediaQuery("(max-width:960px)");
  const buttonTypes = botonesAtrasYAdelante();

  useEffect(() => {
    checkIfIsAdmin();
  }, []);

  const submitStepAdmin = (stepForm, data) => {
    switch (stepForm) {
      case 1:
        const { categoria, estado, nombre, whatsapp, tags } = data;
        setInfoAliado({
          id: null,
          aliadoId: null,
          categoria,
          estado,
          nombre,
          whatsapp,
          tags,
          ciudad: 0,
        });
        setIsTerraza(categoria === "3");
        setStep(2);
        break;
      case 2:
        if (isTerraza) {
          const {
            capacidad,
            capacidad2,
            descripcion,
            servicios,
            espacios,
            direccion,
            alcohol,
            eventosDia,
            eventosNoche,
            estacionamiento,
            alberca,
          } = data;
          setInfoGeneralTerraza({
            idAliado: "",
            isEdition: false,
            tablaTerraza: {
              capacidad: `${capacidad}-${capacidad2}`,
              descripcion,
              servicios,
              espacios,
              direccion,
              alcohol,
              eventosDia,
              eventosNoche,
              estacionamiento,
              alberca,
            },
          });
        } else {
          const { descripcion, servicios, experiencia, dondeOfrecen } = data;
          setInfoGeneralProveedor({
            idAliado: "",
            isEdition: false,
            tablaProveedor: {
              servicios,
              descripcion,
              experiencia,
              dondeOfrecen,
            },
          });
        }
        setStep(3);
        break;
      case 3:
        setEventosSeleccionados({
          selectedEvents: data,
          idAliado: null,
          isEdition: false,
        });
        setStep(4);
        break;
      case 4:
        setImagenes(data);
        setStep(5);
        break;
      case 5:
        setUsernameInfo(data);
        setStep(6);
        break;
    }
  };

  useEffect(() => {
    if (step === 6) {
      setLoading(true);
      console.log({
        paso1Categoria: infoAliado,
        paso2Info: isTerraza ? infoGeneralTerraza : infoGeneralProveedor,
        paso3Eventos: eventosSeleccionados,
        paso4Imagenes: imagenes,
        paso5Url: usernameInfo,
      });
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }admin/newAliado`,
          {
            isTerraza,
            paso1Categoria: infoAliado,
            paso2Info: isTerraza ? infoGeneralTerraza : infoGeneralProveedor,
            paso3Eventos: eventosSeleccionados,
            paso4Imagenes: imagenes,
            paso5Url: usernameInfo,
          },
          userHeaders()
        )
        .then((res) => {
          console.log("fin");
          console.log(res.data);
          setLoading(false);
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
    }
  }, [step]);

  return loading ? (
    <Loading helperText="Cargando... esto podría tardar una eternidad. ntc XD" />
  ) : (
    <div className="admin-add-ali-wrapper">
      <div className="admin-add-ali-wrapper2">
        <p className="admin-add-ali-title">
          Llena los siguientes campos para registrar un aliado
        </p>
        <Stepper2 currentStep={step} numSteps={6} />
        <div className="admin-form-add-box">
          {(() => {
            switch (step) {
              case 1:
                return (
                  <PasoCategoria
                    setIsTerraza={setIsTerraza}
                    isTerraza={isTerraza}
                    isAdminPage
                    submitStepAdmin={submitStepAdmin}
                  />
                );
              case 2:
                return (
                  <PasoInfoGeneral
                    isTerraza={isTerraza}
                    isAdminPage
                    backAdminPage={() => setStep(step - 1)}
                    submitStepAdmin={submitStepAdmin}
                  />
                );
              case 3:
                return (
                  <PasoTypeOfEvents
                    isAdminPage
                    backAdminPage={() => setStep(step - 1)}
                    submitStepAdmin={submitStepAdmin}
                  />
                );
              case 4:
                return (
                  <>
                    <p style={{ color: "red" }}>
                      ADMIN: ES IMPORTANTE SUBIR 3 O MÁS
                    </p>
                    <PasoImagenes
                      premium
                      infoPlan={infoPlan}
                      isAdminPage
                      backAdminPage={() => setStep(step - 1)}
                      submitStepAdmin={submitStepAdmin}
                    />
                  </>
                );
              case 5:
                return (
                  <PasoUrl
                    setUsername={setUsername}
                    isAdminPage
                    backAdminPage={() => setStep(step - 1)}
                    submitStepAdmin={submitStepAdmin}
                  />
                );
              case 6:
                return <PasoConfirmacion username={username} />;
              default:
                return <h1>Error</h1>;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
