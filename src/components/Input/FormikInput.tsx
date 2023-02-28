import { Field, ErrorMessage } from "formik";
import { InputHTMLAttributes } from "react";
import Input from "./Input";

type Props = {
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
};

const FormikInput = ({ name, ...restProps }: Props) => {
  return (
    <div>
      <Field name={name} as={Input} {...restProps} />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default FormikInput;
