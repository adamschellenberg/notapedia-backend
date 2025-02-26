import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Login failed."));
    }
  };

  return (
    <div className="auth-container">
      <h1 className="text-center display-3 loginHeader">Login</h1>
      {message && <p>{message}</p>}
      <div className="mx-auto loginDiv">
        <Form onSubmit={handleLogin}>
          <Form.Label>Email</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <Form.Label className="passwordLabel">Password</Form.Label>
          <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />

          <Button type="submit" variant="primary" className="my-3">Login</Button>
        </Form>
      </div>
    </div>
  )
}
