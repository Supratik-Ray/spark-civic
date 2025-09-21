import * as yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email.")
    .required("Email is required!"),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Password must be at least 5 characters long, contain at least one uppercase letter, and at least one number.",
    })
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Both passwords must match!")
    .required("Confirm password is required!"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email.")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});
