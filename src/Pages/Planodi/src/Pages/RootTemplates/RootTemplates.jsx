/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../componentes/Loading/Loading";
import Template2 from "./Template2/Template2";

export default function RootTemplates() {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState(0);
  const { pathName } = useParams();

  if (loading) return <Loading />;

  return (
    <>
      {(() => {
        switch (template) {
          case 0:
            return <Template2 />;
          default:
            return <Template2 />;
        }
      })()}
    </>
  );
}
