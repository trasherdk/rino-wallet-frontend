import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Delete2FAPayload } from "../../../types";
import { BindHotKeys, Input, Button, Label } from "../../../components";
import { Modal, FormErrors } from "../../../modules/index";

const validationSchema = yup.object().shape({
  code: yup.string().required("This field is required."),
});

interface Props {
  submit: () => Promise<void>;
  cancel: () => void;
  delete2FA: (data: Delete2FAPayload) => Promise<void>;
}
const Disable2FA: React.FC<Props> = ({ submit, cancel, delete2FA }) => {
  const {
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema,
    initialValues: {
      code: "",
      detail: "",
    },
    onSubmit: (formValues, { setErrors }) => {
      return delete2FA({ code: formValues.code }).then(
        () => {
          submit();
        },
        (err) => {

          setErrors(err);
        }
      );
    },
  });
  return (
    <BindHotKeys callback={handleSubmit} rejectCallback={cancel}>
      <Modal
        title="Disable 2FA"
        goBackCallback={cancel}
      >
        <div>
          <p className="mb-6 text-xl">Are you sure?</p>
          <p className="mb-3">This will disable Two-factor authentication entirely.</p>
          <p className="mb-6">For security purposes, please enter the code generated by your authentication device.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-field w-36">
              <Label label="Authentication code">
                <Input
                  type="text"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="tracking-widest"
                  maxLength={6}
                  placeholder="XXXXXX"
                  error={touched.code && errors.code || ""}
                />
              </Label>  
            </div>
            <FormErrors errors={errors} />
            <div className="flex space-x-3 mt-10">
              <Button
                type="button"
                name="cancel-btn"
                onClick={cancel}
                block
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                name="submit-btn"
                loading={isSubmitting}
                variant={Button.variant.RED}
                block
              >
                Disable 2FA
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </BindHotKeys>
  );
};

export default Disable2FA;
