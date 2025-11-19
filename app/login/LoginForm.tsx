"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";

/**
 * Professional Login Form Component
 * Integrates with NextAuth + Django REST Framework backend
 * @date 2025-11-19 (Taiwan Time)
 */
export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations("LoginPage");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      errors.email = t("errors.emailRequired");
    } else if (!validateEmail(email)) {
      errors.email = t("errors.emailInvalid");
    }

    // Password validation
    if (!password) {
      errors.password = t("errors.passwordRequired");
    } else if (password.length < 6) {
      errors.password = t("errors.passwordMinLength");
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle login form submission
   */
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(t("errors.authenticationFailed"));
      } else if (res?.ok) {
        // Successful login - redirect to dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t("errors.serverError"));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fill test account credentials
   */
  const fillTestAccount = () => {
    setEmail("vigor2013@gmail.com");
    setPassword("123456");
    setError(null);
    setFieldErrors({});
  };

  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: 480,
        width: "100%",
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            {t("title")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <Stack spacing={2.5}>
            {/* Email Field */}
            <TextField
              fullWidth
              label={t("emailLabel")}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              autoFocus
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label={t("passwordLabel")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              placeholder={t("passwordPlaceholder")}
              autoComplete="current-password"
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">{t("rememberMe")}</Typography>
                }
              />
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                {t("forgotPassword")}
              </Link>
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  {t("signingIn")}
                </>
              ) : (
                t("signInButton")
              )}
            </Button>
          </Stack>
        </form>

        {/* Test Account Section */}
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {t("testAccount")}
            </Typography>
          </Divider>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={fillTestAccount}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            {t("testAccountEmail")} / {t("testAccountPassword")}
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {t("noAccount")}{" "}
            <Link
              href="/register"
              underline="hover"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              {t("signUp")}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
