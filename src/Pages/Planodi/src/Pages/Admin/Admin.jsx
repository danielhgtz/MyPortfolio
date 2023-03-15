import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { FiMenu } from "react-icons/fi";
import IconButton from "@material-ui/core/IconButton";
import { AiFillHome, AiFillDiff, AiFillEdit } from "react-icons/ai";
import logo from "../../Assets/img/LogoBlanco.webp";

import "./Admin.css";
import { Drawer } from "@material-ui/core";
import RankingScore from "./RankingScore/RankingScore";
import AgregarAliadoAdmin from "./AgregarAliadoAdmin/AgregarAliadoAdmin";

export default function Admin() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [currentPage, setCuerrentPage] = useState(
    parseInt(params?.page) ? parseInt(params?.page) : 0
  );
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const pagesDrawer = [
    {
      name: "Home",
      icon: <AiFillHome className="admin-page-link-icon" />,
      number: 0,
    },
    {
      name: "Rankear",
      icon: <AiFillDiff className="admin-page-link-icon" />,
      number: 1,
    },
    {
      name: "Agregar Negocio",
      icon: <AiFillEdit className="admin-page-link-icon" />,
      number: 2,
    },
  ];

  const checkIfIsAdmin = () => {
    if (!stateUser?.userInfo?.isAdmin) navigate.push("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideBarOpen(open);
  };

  useEffect(() => {
    navigate.push(`?page=${currentPage}`);
  }, [navigate, currentPage]);

  return (
    <div className="navbar-admin-all">
      <div className="navbar-admin">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          style={{ outline: 0 }}
        >
          <FiMenu />
        </IconButton>
      </div>
      <Drawer open={sideBarOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-admin">
          <Link to="/">
            <img src={logo} alt="Logo" className="admin-drwer-logo" />
          </Link>
          {pagesDrawer.map((item) => (
            <div
              key={item.number}
              className="admin-page-link"
              onClick={() => {
                setCuerrentPage(item.number);
                setSideBarOpen(false);
              }}
            >
              {item.icon} <p>{item.name}</p>
            </div>
          ))}
        </div>
      </Drawer>
      <p className="admin-page-title">
        {pagesDrawer.filter((item) => item.number === currentPage)[0]?.name}
      </p>
      {(() => {
        switch (currentPage) {
          case 0:
            return <HomeAdmin checkIfIsAdmin={checkIfIsAdmin} />;
          case 1:
            return <RankingScore checkIfIsAdmin={checkIfIsAdmin} />;
          case 2:
            return <AgregarAliadoAdmin checkIfIsAdmin={checkIfIsAdmin} />;
        }
      })()}
    </div>
  );
}
