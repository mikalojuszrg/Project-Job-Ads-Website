import Flatpickr from "react-flatpickr";
import { useField, ErrorMessage } from "formik";

type Props = {
  name: string;
};

const FormikDatePicker = ({ name }: Props) => {
  const [field, , helpers] = useField(name);

  return (
    <div>
      <Flatpickr
        name={name}
        value={field.value}
        onChange={([date]) => helpers.setValue(date.toISOString())}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default FormikDatePicker;
