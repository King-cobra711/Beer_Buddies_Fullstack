import * as yup from "yup";

export const userSchemaBio = yup.object().shape({
  Biography: yup.string().min(0).max(100),
});
