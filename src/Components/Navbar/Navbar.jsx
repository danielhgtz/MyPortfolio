import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

import { navigateTop } from "../../Utilities/Utilities";
import { AboutVector } from "../../Assets/NavbarVectors/AboutVector";
import { ExperienceVector } from "../../Assets/NavbarVectors/ExperienceVector";
import { ProjectsVectors } from "../../Assets/NavbarVectors/ProjectsVector";
import { ResumeVector } from "../../Assets/NavbarVectors/ResumeVector";
import { MenuOutlined } from "@ant-design/icons";

import {
  navToAbout,
  navToSkillsAndSoftwares,
  navToProjects,
} from "../../Utilities/Utilities";

import "./Navbar.css";

export const Navbar = ({ homeAboutRef, homeSkillsRef, homeProjectsRef }) => {
  const [navbarBoolean, setNavbarBoolean] = useState(false);
  const [navbarMenu, setNavbarMenu] = useState(false);

  const navigate = useNavigate();

  const changeNavBarBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarBoolean(true);
    } else {
      setNavbarBoolean(false);
    }
  };
  window.addEventListener("scroll", changeNavBarBackground);

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 426px)").matches) {
      setNavbarMenu(false);
    } else {
      setNavbarMenu(true);
    }
  });

  const navigateToResume = () => {
    navigate("./Resume");
  };

  const onClick = ({ key }) => {
    const value = parseInt(key);

    if (value === 1) {
      navToAbout(homeAboutRef);
    } else if (value === 2) {
      navToSkillsAndSoftwares(homeSkillsRef);
    } else if (value === 3) {
      navToProjects(homeProjectsRef);
    } else if (value === 4) {
      navigateToResume();
    }
  };

  const items = [
    {
      label: "About",
      key: 1,
    },
    {
      label: "Skills & Softwares",
      key: 2,
    },
    {
      label: "Projects",
      key: 3,
    },
    {
      label: "Resume",
      key: 4,
    },
  ];

  return (
    <nav className={navbarBoolean ? "navbarDiv active" : "navbarDiv"}>
      <div className="nameContainer">
        <div className="navbarName" onClick={navigateTop}>
          Daniel H. Gutierrez
        </div>
      </div>
      <div className="linkContainer">
        {navbarMenu ? (
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <>
            <div className="navbarElement">
              <div
                className="navAbout"
                onClick={() => {
                  homeAboutRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <AboutVector /> <p className="navBarSideTitle">About</p>
              </div>
            </div>
            <div className="navbarElement">
              <div
                className="navExperience"
                onClick={() => {
                  homeSkillsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ExperienceVector />
                <p className="navBarSideTitle">Skills & Softwares</p>
              </div>
            </div>
            <div className="navbarElement">
              <div
                className="navProjects"
                onClick={() => {
                  homeProjectsRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <ProjectsVectors />
                <p className="navBarSideTitle">Projects</p>
              </div>
            </div>
            <div className="navbarElement">
              <div className="navResume" onClick={navigateToResume}>
                <ResumeVector />
                <p className="navBarSideTitle">Resume</p>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
