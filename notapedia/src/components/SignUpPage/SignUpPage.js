import React, {useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUpPage.css';
import Alert from 'react-bootstrap/Alert';

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format. Please enter a valid email.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await axios.post("https://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api/auth/register", {
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
      {message && <Alert className="mx-5">{message}</Alert>}
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
