import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./CardExplore.css";

export default function DotsImages({ numDots, imagenActual }) {
  return (
    <div className="card-exp-img-dots">
      {numDots.map((item, idx) => (
        <div key={idx}>
          <FiberManualRecordIcon
            className={
              imagenActual % numDots.length === idx
                ? "cardexp-dot-imgs-dot active"
                : "cardexp-dot-imgs-dot"
            }
          />
        </div>
      ))}
    </div>
  );
}
