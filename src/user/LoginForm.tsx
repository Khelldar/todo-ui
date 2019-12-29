import React, { useContext } from 'react';
import { sdk } from '../graphql/sdk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserContext } from '../userContext';
import { setToken } from '../token';

export const Login: React.FC = () => {
  const [_, setUser] = useContext(UserContext);

  return (
    <Formik
      initialValues={{ email: 'test@fake.com', password: 'boggle' }}
      validate={values => {
        const errors: Partial<typeof values> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        sdk.loginUser(values).then(data => {
          setUser(data.loginUser.user);
          setToken(data.loginUser.accessToken);
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
