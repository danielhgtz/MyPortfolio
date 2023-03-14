import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { NavBar } from "../../Components/Navbar/Navbar";
import { useIsLogged } from "../../helper/Context";

import "./Login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState < string > "";
  const [password, setPassword] = useState < string > "";
  const { isLogged, setIsLogged } = useIsLogged();

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login sucessful!");
      setIsLogged(true);
      navigate("../LSCalculator", { replace: true });
    } else {
      alert("Please review your username or password :( ");
    }
  };

  return (
    <div>
      <NavBar />

      <div className="placerLogin">
        <div className="shapeLogin"></div>
        <div className="shapeLogin"></div>
      </div>
      <form onSubmit={loginUser} className="login-Form">
        <h3 className="secondaryTitle">Login</h3>
        <label>Username:</label>

        <Input
          placeholder="Ex: You"
          size="large"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <label>Password:</label>
        <Input
          placeholder="Ex: YourPassword123"
          size="large"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <Button type="primary" htmlType="submit" className="loginBtn">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Register;

/* const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {*/
