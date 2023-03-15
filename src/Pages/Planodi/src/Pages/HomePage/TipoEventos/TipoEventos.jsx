import React from "react";
import "./TipoEventos.css";

export default function TipoEventos() {
  return (
    <div>
      <p className="tiposEv-titulo">¿Qué evento estás organizando?</p>
      <div className="tiposEv-wrapper">
        <div className="tiposEv-margins" />
        <div className="tiposEv-gr-wr">
          <div className="tiposEv-box4">
            <p className="tiposEv-tiposEv">Cumpleños</p>
          </div>
          <div className="tiposEv-box5">
            <p className="tiposEv-tiposEv">Fiesta infantil</p>
          </div>
          <div className="tiposEv-box3">
            <p className="tiposEv-tiposEv">Boda</p>
          </div>
          <div className="tiposEv-box1">
            <p className="tiposEv-tiposEv">Corpotativo</p>
          </div>
          <div className="tiposEv-box2">
            <p className="tiposEv-tiposEv">Pool party</p>
          </div>
          <div className="tiposEv-box6">
            <p className="tiposEv-tiposEv">Bautizo / primera comunión</p>
          </div>
          <div className="tiposEv-box7">
            <p className="tiposEv-tiposEv">XV años</p>
          </div>
          <div className="tiposEv-box8">
            <p className="tiposEv-tiposEv">Baby shower / Gender reveal</p>
          </div>
          <div className="tiposEv-box9">
            <p className="tiposEv-tiposEv">Rooftop party</p>
          </div>
        </div>
        <div className="tiposEv-margins" />
      </div>
    </div>
  );
}
