"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Toast from "@/components/Toast";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function SignInOne() {
  const searchParam = useSearchParams();

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setError] = useState<LoginErrorType>();

  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    console.log("The query is", searchParam.get("error"));
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const submitForm = async () => {
    setLoading(true);
    axios
      .post("/api/auth/login", authData)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        console.log("The response is ", response);
        if (response.status == 200) {
          console.log("The user signed in", response);
          signIn("credentials", {
            email: authData.email,
            password: authData.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setError(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error is", err);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h3">Login</Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                name="email"
                value={authData.email}
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
                placeholder="Enter email address"
                fullWidth
                error={Boolean(errors?.email)}
              />
              {errors?.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="-password-login"
                error={Boolean(errors?.password)}
                type={showPassword ? "text" : "password"}
                value={authData.password}
                name="password"
                onChange={(e) =>
                  setAuthData({ ...authData, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {errors?.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors?.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          {/* {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )} */}
          <Grid item xs={12}>
            <Button
              disableElevation
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
