import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './userContext';
import { sdk } from '../graphql/sdk';

interface Form {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [, publish] = useContext(UserContext);

  const { register, handleSubmit, errors, formState, setError } = useForm<Form>({
    defaultValues: {
      email: 'test@fake.com',
      password: 'boggle',
    },
  });

  const onSubmit = handleSubmit(data => {
    return sdk
      .loginUser(data)
      .then(data => {
        publish({
          type: 'LoggedIn',
          payload: {
            user: data.loginUser.user,
          },
        });
      })
      .catch(e => {
        //TODO: conditional check on kind of error
        setError([
          {
            name: 'email',
            type: 'invalid',
            message: 'username or password incorrect',
          },
          {
            name: 'password',
            type: 'invalid',
            message: 'username or password incorrect',
          },
        ]);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          type="email"
          name="email"
          ref={register({ required: 'email is required' })}
        />
        {errors.email && errors.email.message}
        <input
          className="form-control"
          type="password"
          name="password"
          ref={register({ required: 'password is required' })}
        />
        {errors.password && errors.password.message}
        <input
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
          disabled={formState.isSubmitting}
        />
      </div>
    </form>
  );
};
