import * as yup from "yup";

export const userSchema = yup.object().shape({
  Password: yup.string().min(6).max(20),
  biograpghy: yup.string().min(0).max(100),
  picture: yup
    .string()
    .min(4)
    .max(10)
    .matches(
      /^(Back|Coors|Corona|Heineken|Peroni|StoneWood|xxxxGold)$/,
      "Not a valid picture"
    ),
  theme: yup.string().min(3).max(15),
  blacklistStatus: yup.number(),
  userLevel: yup.number(),
});
