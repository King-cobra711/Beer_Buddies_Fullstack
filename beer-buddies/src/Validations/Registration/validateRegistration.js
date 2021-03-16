import * as yup from 'yup';

export const userSchema = yup.object().shape({
    Email: yup.string().email().required("Invalid Email"),
    Username: yup.string().min(3).max(15).required("Required"),
    Password: yup.string().min(6).max(20).required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref('Password'), null], "passwords must match").required("Required")
});