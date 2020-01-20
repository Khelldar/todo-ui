import React from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Props {
  todo: Todo;
}

export const TodoDisplay: React.FC<Props> = props => {
  const classes = useStyles();
  const { text } = props.todo;

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={11}>
          {text}
        </Grid>
        <Grid item xs={1}>
          <Close />
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
