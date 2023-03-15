/* eslint-disable react-hooks/exhaustive-deps */
import "./Afiliarme.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../../componentes/Loading/Loading";
import { userHeaders } from "../../Utils/headerSetter";
import Navbar from "../HomePage/Navbar/Navbar";
import PasoCategoria from "../../componentes/pasos/PasoCategoria/PasoCategoria";
import { useSelector } from "react-redux";
import PasoInfoGeneral from "../../componentes/pasos/PasoInfoGeneral/PasoInfoGeneral";
import PasoImagenes from "../../componentes/pasos/PasoImagenes/PasoImagenes";
import PasoUrl from "../../componentes/pasos/PasoUrl/PasoUrl";
import PasoConfirmacion from "../../componentes/pasos/PasoConfirmacion/PasoConfirmacion";
import Stepper2 from "../../componentes/pasos/Stepper/Stepper2";
import PasoSelectPlan from "../../componentes/pasos/PasoPlan/PasoSelectPlan";
import PasoTypeOfEvents from "../../componentes/pasos/PasoTypeOfEvents/PasoTypeOfEvents";
import PasoWelcome from "../../componentes/pasos/PasoWelcome/PasoWelcome";
import PasoFAQ from "../../componentes/pasos/PasoFAQ/PasoFAQ";
import PasoCreatePackages from "../../componentes/pasos/PasoPaquetes/PasoCreatePackages";

export default function Afilairme() {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const [step, setStep] = useState(parseInt(params?.paso));
  const [currentStep, setCurrentStep] = useState(0);
  const [idAliado, setIdAliado] = useState(null);
  const [username, setUsername] = useState("");
  const [isTerraza, setIsTerraza] = useState(true);
  const [premium, setPremium] = useState(false);
  const [infoPlan, setInfoPlan] = useState({ cantidadDeFotos: 3 });
  const userID = useSelector((state) => state?.user?.userInfo?.id);

  const [loading, setLoading] = useState(true);
  const [aliadoInfoGeneral, setAliadoInfoGeneral] = useState(null);
  const [aliadoInfoSecundaria, setAliadoInfoSecundaria] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [eventosActivos, setEventosActivos] = useState([]);

  useEffect(() => {
    if (userID) {
      setLoading(true);
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/getRegistrosPendientes?userId=${userID}`,
          userHeaders(false)
        )
        .then((res) => {
          if (res.data.length > 0) {
            setCurrentStep(parseInt(res.data[0].step) + 1);
            setIdAliado(res.data[0].idAliado);
          } else {
            navigate.push("/afiliarme");
            setStep(0);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [userID]);

  useEffect(() => {
    if (idAliado && loading)
      axios
        .get(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/getAliadoById?idAliado=${idAliado}`,
          userHeaders(false)
        )
        .then((res) => {
          const {
            aliadoInfoGeneral,
            infoSecundaria,
            multimedia,
            packages,
            eventosActivos,
            isTerraza,
          } = res.data;
          setAliadoInfoGeneral(aliadoInfoGeneral);
          setCurrentStep(parseInt(aliadoInfoGeneral.step) + 1);
          setAliadoInfoSecundaria(infoSecundaria);
          setFotos(multimedia);
          setPaquetes(packages);
          setIsTerraza(isTerraza);
          setEventosActivos(eventosActivos);
          setLoading(false);
        })
        .catch(() => setLoading(false));
  }, [idAliado, loading]);

  useEffect(() => {
    if (params?.paso && parseInt(params?.paso) !== step) {
      navigate.push(`?paso=${params.paso}`);
      setStep(parseInt(params.paso));
    }
  }, [params?.paso]);

  useEffect(() => {
    if (currentStep > 0 && step > currentStep && !loading) {
      navigate.push(`?paso=${currentStep}`);
      setStep(currentStep);
    }
  }, [step, currentStep, loading]);

  useEffect(() => {
    if (step) {
      navigate.push(`?paso=${step}`);
    } else {
      setStep(currentStep);
    }
  }, [step, currentStep]);

  return loading ? (
    <Loading helperText="Cargando..." />
  ) : (
    <div className="afil-wrapper">
      <div style={{ width: "100%", minWidth: "320px" }}>
        <Navbar type="black" shadow />
      </div>
      <div className="afil-content-wrp">
        {/*{step < 7 ? <Stepper progress={step * 16.67} step={step} /> : null}*/}
        {step === 9 || step === 0 ? null : (
          <Stepper2 currentStep={step} numSteps={8} />
        )}
        {(() => {
          switch (step) {
            case 0:
              return <PasoWelcome setStep={setStep} />;
            case 1:
              return (
                <PasoCategoria
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  userID={userID}
                  setIsTerraza={setIsTerraza}
                  isTerraza={isTerraza}
                  setIdAliado={setIdAliado}
                  isEdition={!!idAliado && !!aliadoInfoGeneral}
                  dataPrincipal={aliadoInfoGeneral}
                  isMainPage
                />
              );
            case 2:
              return (
                <PasoInfoGeneral
                  isTerraza={isTerraza}
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  isEdition={step < currentStep}
                  dataSecundaria={aliadoInfoSecundaria}
                  isMainPage
                />
              );
            case 3:
              return (
                <PasoTypeOfEvents
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  isEdition={step < currentStep}
                  eventosActivos={eventosActivos}
                  isMainPage
                />
              );
            case 4:
              return (
                <PasoFAQ
                  isTerraza={isTerraza}
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  isEdition={step < currentStep}
                  dataSecundaria={aliadoInfoSecundaria}
                  isMainPage
                />
              );
            case 5:
              return (
                <PasoSelectPlan
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  setPremium={setPremium}
                  idAliado={idAliado}
                  setInfoPlan={setInfoPlan}
                  isEdition={step < currentStep}
                />
              );
            case 6:
              return (
                <PasoImagenes
                  premium={premium || aliadoInfoGeneral?.membresia === 2}
                  infoPlan={infoPlan}
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  isEdition={step < currentStep}
                  currentImages={fotos}
                  initialMain={fotos
                    ?.filter((img) => img.main)[0]
                    ?.id.toString()}
                  isMainPage
                />
              );
            case 7:
              return (
                <PasoCreatePackages
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  isEdition={step < currentStep}
                  currentPackages={paquetes}
                  isMainPage
                />
              );
            case 8:
              return (
                <PasoUrl
                  setStep={(newStep) => {
                    setLoading(true);
                    setStep(newStep);
                  }}
                  idAliado={idAliado}
                  setUsername={setUsername}
                />
              );
            case 9:
              return <PasoConfirmacion username={username} />;
            default:
              return <h1>Error</h1>;
          }
        })()}
        {step === 9 || step === 0 ? null : (
          <p className="afil-help-text">
            ¿Necesitas ayuda?{" "}
            <a
              href={`https://api.whatsapp.com/send?phone=523319764162&text=Hola!%20Estoy%20registr%C3%A1ndome%20como%20aliado,%20voy%20en%20el%20paso%20${step}%20y%20tengo%20una%20duda.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              haz click en este enlace para preguntarnos por whatsapp
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
