import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TodosContext } from './todosContext';
import uuid from 'uuid';
import { sdk } from '../graphql/sdk';

interface Form {
  text: string;
}

export const CreateTodoForm: React.FC = () => {
  const [, publish] = useContext(TodosContext);
  const { register, handleSubmit, errors, formState, reset } = useForm<Form>({});

  const onSubmit = handleSubmit(formData => {
    const todo = {
      id: uuid.v4(),
      text: formData.text,
      completed: false,
    };

    publish({
      type: 'TodoCreated',
      payload: {
        todo,
      },
    });
    reset();
    sdk.upsertTodos({ upsertTodoInputs: [todo] }).catch(e => {
      console.log(e);
      publish({
        type: 'TodoCreateActuallyFailed',
        payload: {
          todo,
        },
      });
      alert('todo failed to create! check logs for more details');
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" name="text" ref={register({ required: 'text is required' })} />
        {errors.text && errors.text.message}

        <button type="submit" disabled={formState.isSubmitting}>
          Create Todo
        </button>
      </div>
    </form>
  );
};
