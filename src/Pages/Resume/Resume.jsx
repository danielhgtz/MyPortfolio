import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import { DownloadVector } from "../../Assets/PDFAssets/DownloadVector";

import "./Resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ResumePDF = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const onButtonClickDownloadPDF = () => {
    fetch("PDFResume/ResumeDanielGutierrezENG.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);

        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "ResumeDanielGutierrezENG.pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="pdfWrapper">
      <Document
        className="pdfContainer"
        file="/PDFResume/ResumeDanielGutierrezENG.pdf"
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="navResumePDF">
        <div className="nameContainerPDF">
          <div className="navbarNamePDF" onClick={navigateHome}>
            Daniel H. Gutierrez
          </div>
        </div>
        <div className="downloadContainerPDF">
          <div onClick={onButtonClickDownloadPDF}>
            <DownloadVector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePDF;
