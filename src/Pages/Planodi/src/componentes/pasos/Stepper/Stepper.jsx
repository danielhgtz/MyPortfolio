import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Stepper.css";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    backgroundColor: "#fdc70b",
  },
}))(LinearProgress);

export default function Stepper({ progress, step }) {
  return (
    <div style={{ minWidth: "320px" }}>
      <div
        style={{
          position: "relative",
          margin: "3rem 0 4rem 0",
        }}
        className={step === 2 || step === 6 ? "afil-progress-anim" : null}
      >
        <div
          className={`${
            step === 2 || step === 6 ? "afil-circ-anim" : null
          } afil-circulo`}
          style={
            progress >= 16.67
              ? { left: "16.67%", backgroundColor: "#fdc70b" }
              : { left: "16.67%", backgroundColor: "#eeeeee" }
          }
        >
          <p className="afil-circulo-content">1</p>
        </div>
        <div
          className={`${
            step === 2 || step === 6 ? "afil-circ-anim" : null
          } afil-circulo`}
          style={
            progress >= 33.34
              ? { left: "33.34%", backgroundColor: "#fdc70b" }
              : { left: "33.34%", backgroundColor: "#eeeeee" }
          }
        >
          <p className="afil-circulo-content">2</p>
        </div>
        <div
          className={`${
            step === 2 || step === 6 ? "afil-circ-anim" : null
          } afil-circulo`}
          style={
            progress >= 50.01
              ? { left: "50.01%", backgroundColor: "#fdc70b" }
              : { left: "50.01%", backgroundColor: "#eeeeee" }
          }
        >
          <p className="afil-circulo-content">3</p>
        </div>
        <div
          className={`${
            step === 2 || step === 6 ? "afil-circ-anim" : null
          } afil-circulo`}
          style={
            progress >= 66.68
              ? { left: "66.68%", backgroundColor: "#fdc70b" }
              : { left: "66.68%", backgroundColor: "#eeeeee" }
          }
        >
          <p className="afil-circulo-content">4</p>
        </div>
        <div
          className={`${
            step === 2 || step === 6 ? "afil-circ-anim" : null
          } afil-circulo`}
          style={
            progress >= 83.35
              ? { left: "83.35%", backgroundColor: "#fdc70b" }
              : { left: "83.35%", backgroundColor: "#eeeeee" }
          }
        >
          <p className="afil-circulo-content">5</p>
        </div>
        <BorderLinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}
