import React, { useContext } from 'react';
import { sdk } from '../graphql/sdk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserContext } from '../userContext';
import { setToken } from '../token';

export const Login: React.FC = () => {
  const [, setUser] = useContext(UserContext);

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
          setSubmitting(false);
          setToken(data.loginUser.accessToken);
          setUser(data.loginUser.user);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-signin">
          <div className="form-label-group">
            <Field
              className="form-control"
              id="inputEmail"
              type="email"
              name="email"
              placeholder="email"
              required
              autoFocus
            />
            <ErrorMessage name="email" component="div" />

            <Field
              className="form-control"
              id="inputPassword"
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <ErrorMessage name="password" component="div" />

            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
              disabled={isSubmitting}
            >
              sign in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
