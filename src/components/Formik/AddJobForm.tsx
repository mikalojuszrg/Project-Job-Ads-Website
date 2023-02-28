import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import Emoji from "../Emoji/Emoji";
import FormikInput from "../Input/FormikInput";
import { JobType, NewJob } from "../../types/job";
import { requiredField } from "../../const/validations";
import FormikSelect from "../Input/FormikSelect";
import FormikDatePicker from "../Formik/FormikDatePicker";
import { darkGrey } from "../../const/styles";
import { useCreateJob } from "../../hooks/jobsHooks";

const initialValue: NewJob = {
  title: "",
  price: "",
  type: "fullTime",
  starting_from: "",
  has_drivers_license: false,
  user_id: 0,
  description: "",
};

const validationSchema: Yup.ObjectSchema<NewJob> = Yup.object().shape({
  title: Yup.string().required(requiredField),
  price: Yup.number().required(requiredField),
  description: Yup.string().required(requiredField),
  type: Yup.mixed<JobType>()
    .oneOf(["fullTime", "freelance", "partTime"])
    .required(requiredField),
  starting_from: Yup.string().required(requiredField),
  has_drivers_license: Yup.boolean().required(requiredField),
  user_id: Yup.number().required(),
});

const AddJobForm = () => {
  const { mutateAsync: createJob } = useCreateJob();

  const handleSubmit = (values: NewJob) => {
    console.log(values);
    createJob(values)
      .then((response) => {
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to post the ad");
      });
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => (
        <StyledForm>
          <Title>
            Create a job ad <Emoji symbol="✍" />
          </Title>
          <InputRow>
            <InputRowItem>
              <FormikInput type="text" name="title" placeholder="Job title" />
            </InputRowItem>
            <InputRowItem>
              <FormikInput
                type="number"
                name="price"
                placeholder="Pay offered"
              />
            </InputRowItem>
          </InputRow>
          <FormikSelect
            name="type"
            options={[
              { value: "fullTime", label: "Full Time" },
              { value: "partTime", label: "Part Time" },
              { value: "freelance", label: "Freelance" },
            ]}
          />
          <FormikInput
            type="text"
            name="description"
            placeholder="Job description"
          />
          <FormikDatePicker name="starting_from" />
          <ButtonsContainer>
            <Button greyVariant={true} onClick={closeModal} title="close" />
            <Button title="save" onClick={submitForm} />
          </ButtonsContainer>
        </StyledForm>
      )}
    </Formik>
  );
};

export default AddJobForm;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 32px;
  color: ${darkGrey};
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 32px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const InputRowItem = styled.div`
  flex: 1;
`;
function closeModal() {
  throw new Error("Function not implemented.");
}
