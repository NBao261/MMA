import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  bio: Yup.string().max(150, "Bio must be less than 150 characters"),
});
