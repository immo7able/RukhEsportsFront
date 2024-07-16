import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

const MenuList = ({ menuItems, handleMenuItemClick }) => {
  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          button
          key={index}
          onClick={() => handleMenuItemClick(item.path)}
          sx={{ padding: '20px' }}
        >
          <ListItemText primaryTypographyProps={{ fontSize: '1.7rem', fontFamily: 'Oswald, serif', color: 'rgb(0,142,130, 0.8)' }} primary={item.text} />
          <ArrowForwardIosIcon sx={{ fontSize: '20px !important', color: 'rgb(0,142,130, 0.8)' }} />
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
