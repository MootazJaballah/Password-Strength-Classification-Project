import React, { useState } from "react";
import axios from 'axios';
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { meta } from "../../content_option";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    Password: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.Password,
      });
      // Handle user info if needed, e.g., store in state or localStorage
      toast.success(`Welcome back, ${response.data.firstName}!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setFormData({ ...formData, loading: false, show: true });
      // Here you might want to redirect the user or perform some other action
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setFormData({ ...formData, loading: false, show: true, alertmessage: 'Login failed. Please try again.' });
      console.error('Login error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | login</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Log In</h1>
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

          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
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
              <Col lg="12" className="form-group">
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
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Sending..." : "LogIn"}
                  </button>
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
