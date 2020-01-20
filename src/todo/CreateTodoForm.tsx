import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TodosContext } from './todosContext';
import uuid from 'uuid';
import { sdk } from '../graphql/sdk';
import { TextField, makeStyles, Grid, Button } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

interface Form {
  text: string;
}

export const CreateTodoForm: React.FC = () => {
  const [, publish] = useContext(TodosContext);
  const { register, handleSubmit, errors, formState, reset } = useForm<Form>({});

  const classes = useStyles();

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
    <form className={classes.root} onSubmit={onSubmit}>
      <div className="form-group">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="text"
              variant="outlined"
              inputRef={register({ required: 'text is required' })}
              error={!!errors.text}
              helperText={errors.text && errors.text.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Add />}
              disabled={formState.isSubmitting}
            >
              Create Todo
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));
