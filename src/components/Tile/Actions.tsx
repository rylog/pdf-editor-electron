import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';

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
