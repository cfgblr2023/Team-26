/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import AuthApi from "../../../api/auth";

import { useAuth } from "auth-context/auth.context";

function SignUp() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [agreement2, setAgremment2] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleSetAgremment = () => setAgremment(!agreement);
  const handleSetAgremment2 = () => setAgremment2(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Register(formData)
      .then((response) => {
        if (response.data.success) {
          return navigate("/authentication/sign-in");
        } else {
          setError(response.data.msg);
        }
      })
      .catch((error) => {
        if (error.response) {
          return setError(error.response.data.msg);
        }
        return setError("There has been an error.");
      });
  };

  const handleRedirect = () => navigate("/dashboard");

  return (
    <BasicLayout
      title="Welcome!"
      image={curved6}
    >
      {user && user.token ? (
        <Card>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
              {`Let's go`}
            </SoftButton>
          </SoftBox>
        </Card>
      ) : (
        <Card>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="username"
                  placeholder="Name"
                  onChange={handleFormData}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  placeholder="Email"
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
              </SoftBox>
              <SoftBox mb={2}>
              <select name = "modules" id="modules" multiple>
                <option value="" disabled selected>Select a module</option>
                <option value="module1">Mass Communication</option>
                <option value="module2">Social Media</option>
                <option value="module3">Finance</option>
                <option value="module4">Job Search</option>
              </select>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="days"
                  placeholder="Available Days"
                  onChange={handleFormData}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="timeSlots"
                  placeholder="Time Slots"
                  onChange={handleFormData}
                />
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <SoftTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  textGradient
                >
                  Languages:
                </SoftTypography>
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                {"English\n"}
                <Checkbox checked={agreement2} onChange={handleSetAgremment2} />
                {"Kannada\n"}
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "poiner", userSelect: "none" }}
                >
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={2} mb={2} textAlign="center">
                <h6
                  style={{
                    fontSize: ".8em",
                    color: "red",
                    textAlign: "center",
                    fontWeight: 400,
                    transition: ".2s all",
                  }}
                >
                  {error}
                </h6>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                  sign up
                </SoftButton>
              </SoftBox>
              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Already have an account?&nbsp;
                  <SoftTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="dark"
                    fontWeight="bold"
                    textGradient
                  >
                    Sign in
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      )}
    </BasicLayout>
  );
}

export default SignUp;
