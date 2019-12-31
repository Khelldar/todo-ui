import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SdkContext } from '../sdkContext';
import { TodosContext } from './todosContext';
import uuid from 'uuid';

export const CreateTodoForm: React.FC = () => {
  const sdk = useContext(SdkContext);
  const [, publish] = useContext(TodosContext);

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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const todo = {
          id: uuid.v4(),
          text: values.text,
          completed: false,
        };

        publish({
          type: 'TodoCreated',
          payload: {
            todo,
          },
        });
        resetForm();
        sdk
          .upsertTodos({ upsertTodoInputs: [todo] })
          .then(() => {
            setSubmitting(false);
          })
          .catch(e => {
            console.log(e);
            publish({
              type: 'TodoCreateActuallyFailed',
              payload: {
                todo,
              },
            });
            alert('todo failed to create! check logs for more details');
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
