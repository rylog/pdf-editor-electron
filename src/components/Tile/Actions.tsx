import { ButtonGroup, IconButton, Paper } from '@mui/material';

export interface Action {
  icon: JSX.Element;
  onClick: () => void;
}

export interface ActionsProps {
  actions: Action[];
}

const Actions = (props: ActionsProps) => {
  const { actions } = props;
  return (
    <Paper>
      <ButtonGroup orientation="vertical">
        {actions.map((action, index) => (
          <IconButton key={index} onClick={action.onClick}>
            {action.icon}
          </IconButton>
        ))}
      </ButtonGroup>
    </Paper>
  );
};

export default Actions;
