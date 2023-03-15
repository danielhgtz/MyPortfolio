import React from "react";
import { makeStyles, createStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    top: {
      color: "rgba(140, 80, 255, 0.95)",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

function CircularProgress2(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={70}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={70}
        thickness={4}
        {...props}
      />
    </div>
  );
}

/**
 * Componente de carga
 * */

export default function Loading({ helperText }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <CircularProgress2 />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "70%",
          transform: "translate(-50%,-50%)",
          width: "300px",
        }}
      >
        {helperText ? (
          <p
            style={{
              color: "#3c3c3c",
              opacity: 0.8,
              textAlign: "center",
              width: "100%",
            }}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </>
  );
}

Loading.defaultProps = {
  helperText: "",
};
