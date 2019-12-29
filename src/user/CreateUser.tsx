import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateUser: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validate={values => {
        const errors: Partial<typeof values> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (values.password !== values.confirmPassword) {
          errors.password = 'passwords do not match';
          errors.confirmPassword = 'passwords do not match';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="confirmPassword" />
          <ErrorMessage name="confirmPassword" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
