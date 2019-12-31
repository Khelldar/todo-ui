import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SdkContext } from '../sdkContext';

export const CreateTodoForm: React.FC = () => {
  const sdk = useContext(SdkContext);

  return (
    <Formik
      initialValues={{ text: '' }}
      validate={values => {
        const errors: Partial<typeof values> = {};
        if (!values.text) {
          errors.text = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        sdk
          .upsertTodos({ upsertTodoInputs: [{ text: values.text, completed: false }] })
          .then(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="text" />
          <ErrorMessage name="email" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Create Todo
          </button>
        </Form>
      )}
    </Formik>
  );
};
