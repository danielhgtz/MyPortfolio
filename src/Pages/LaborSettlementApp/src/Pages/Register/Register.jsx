import React, { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../Components/Navbar/Navbar";
import { OnChangeUsername, OnChangeEmail, OnBlurPassword } from "./Utiles";

import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (username && email && password) {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.status === "ok") {
        navigate("/login");
      }
    } else {
      alert("Complete all inputs :)");
    }
  };

  const onChangeUsername = (e) => {
    OnChangeUsername(e, setUsername);
  };

  const onChangeEmail = (e) => {
    OnChangeEmail(e, setEmail);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onBlurPassword = () => {
    OnBlurPassword(password, setPassword);
  };

  return (
    <div>
      <NavBar />

      <div className="placer">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={registerUser} className="login-Form">
        <h3 className="secondaryTitle">Register</h3>

        <label>Username:</label>
        <Input
          placeholder="Ex: You"
          size="large"
          value={username}
          onChange={onChangeUsername}
          maxLength={20}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip
              style={{ color: "red" }}
              title="Username can't contain spaces."
            >
              <InfoCircleOutlined style={{ color: "rgb(0,0,205)" }} />
            </Tooltip>
          }
        />

        <label>Email:</label>
        <Input
          placeholder="Ex: Your Email"
          size="large"
          value={email}
          onChange={onChangeEmail}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />

        <label>Password:</label>
        <Input
          placeholder="Ex: YourPassword123"
          size="large"
          type="password"
          value={password}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          maxLength={16}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip
              style={{ color: "red" }}
              title="Password must be between 8-16 characters long and include at least one number and a capital letter."
            >
              <InfoCircleOutlined style={{ color: "rgb(0,0,205)" }} />
            </Tooltip>
          }
        />
        <Button type="primary" htmlType="submit" className="loginBtn">
          Create Account
        </Button>
        <Button
          type="primary"
          className="loginBtn"
          onClick={() => {
            navigate("../login", { replace: true });
          }}
        >
          Already have an account?
        </Button>
      </form>
    </div>
  );
};

export default Register;
