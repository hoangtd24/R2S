import React from 'react';

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

export default function Collap({ children, title, open, handleClick}) {

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemText center={true} primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </List>
    )
}
