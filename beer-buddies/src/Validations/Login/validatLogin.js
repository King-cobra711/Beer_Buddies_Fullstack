import * as yup from 'yup';

export const userSchema = yup.object().shape({
    Username: yup.string().min(3).max(15).required(),
    password: yup.string().min(6).max(20).required(),
});