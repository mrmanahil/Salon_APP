import * as yup from 'yup';

export const RegisterFormValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const LoginFormValidation = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
