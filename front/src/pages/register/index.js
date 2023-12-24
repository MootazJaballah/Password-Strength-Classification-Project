import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { meta, contactConfig } from "../../content_option";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    FirstName: "",
    LastName: "",
    Password: "",
    Password2: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });
  const [strength, setStrength] = useState(null);

  const checkPasswordStrength = async (password) => {
    try {
      const response = await axios.post('http://localhost:5001/predict', { password });
      setStrength(response.data.strength);
      handleStrength(response.data.strength);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStrength = (strength) => {
    if (strength === 0) {
      toast.error("Password is too weak.", { position: toast.POSITION.TOP_CENTER });
    } else if (strength === 1) {
      toast.warn("Try improving your password for more protection.", { position: toast.POSITION.TOP_CENTER });
    } else if (strength === 2) {
      postSignup();
    }
  }

  const postSignup = async () => {
    const registerBody = {
      email: formData.email,
      password: formData.Password,
      firstName: formData.FirstName,
      lastName: formData.LastName
    };
    try {
      await axios.post('http://localhost:5000/register', registerBody);
      toast.success('Registration successful!', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      toast.error('Registration failed. Please try again.', { position: toast.POSITION.TOP_CENTER });
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== formData.Password2) {
      alert('Passwords do not match!');
      return;
    }
    setFormData({ ...formData, loading: true });
    await checkPasswordStrength(formData.Password);
    setFormData({ ...formData, loading: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Register</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              //show={formData.show}
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"
                }`}
              onClose={() => setFormdata({ show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Join Us</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="FirstName"
                    name="FirstName"
                    placeholder="First Name"
                    value={formData.FirstName || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="LastName"
                    name="LastName"
                    placeholder="Last Name"
                    value={formData.LastName || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Col lg="12" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email || ""}
                  required
                  onChange={handleChange}
                />
              </Col>
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="Password"
                    name="Password"
                    placeholder="Password"
                    value={formData.Password || ""}
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="Password2"
                    name="Password2"
                    placeholder="Confirm Password"
                    value={formData.Password2 || ""}
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Sending..." : "Register"}
                  </button>
                  <Link to="/login" className="text_2">
                    <button className="btn ac_btn">
                      I have an account
                    </button>
                  </Link>
                  <ToastContainer />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};

