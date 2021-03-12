import * as yup from 'yup';

export const userSchema = yup.object().shape({
    email: yup.string().email().required("Invalid Email"),
    Username: yup.string().min(3).max(15).required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword:yup.string().oneOf([yup.ref('password'), null], "passwords must match").required()
});