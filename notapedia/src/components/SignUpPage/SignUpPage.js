import React, {useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpPage.css';

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5026/api/auth/register", {
        email,
        password,
      });

      console.log("Response: ", response.data);
      setMessage("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="auth-container">
      <h1 className="display-3 text-center signupHeader">Sign Up</h1>
      {message && <p>{message}</p>}
      <div className="mx-auto signupDiv">
        <Form onSubmit={handleSignUp}>
          <Form.Label>Email</Form.Label>
          <Form.Control
          type="email"
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
          <Button type="submit" className="my-3">Sign Up</Button>
        </Form>
      </div>
    </div>
  )
}
