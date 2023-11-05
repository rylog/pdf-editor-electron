import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

const modes = [
  {
    label: 'Rearrange',
    description: 'Change the order of pages by dragging and dropping',
  },
  {
    label: 'Rotate',
    description: 'Select and change the orientation of pages',
  },
];

export const MenuSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = anchorEl != null;
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ListItemButton onClick={handleButtonClick}>
        <ListItemText primary={modes[selectedIndex].label} />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </ListItemButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {modes.map((option, index) => (
          <MenuItem
            key={option.label}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <ListItemText
              primary={option.label}
              secondary={option.description}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
