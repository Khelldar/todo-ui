import React from 'react';
import { Todo, TodoDisplay } from './TodoDisplay';
import { Grid, makeStyles } from '@material-ui/core';

export interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = props => {
  const classes = useStyles();
  const { todos } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {todos.map(todo => (
          <Grid item xs={12}>
            <TodoDisplay key={todo.id} todo={todo}></TodoDisplay>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));
