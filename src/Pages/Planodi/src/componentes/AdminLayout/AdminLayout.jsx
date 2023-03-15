import React from "react";
import Loading from "../Loading/Loading";

import "./AdminLayout.css";

export default function AdminLayout({ children, loading }) {
  return loading ? (
    <Loading helperText="Cargando..." />
  ) : (
    <div className="admin-layout-div1">
      <div className="admin-layout-div2">
        <main>{children}</main>
      </div>
    </div>
  );
}
