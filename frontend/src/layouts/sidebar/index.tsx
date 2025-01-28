import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling

const sidebarItems = {
  ADMIN: [
    { label: "All Users", path: "/users", icon: "people" },
    { label: "Profile", path: "/profile", icon: "account_circle" },
    { label: "Security", path: "/changePassword" },
  ],
  USER: [
    { label: "Profile", path: "/profile", icon: "account_circle" },
    { label: "Security", path: "/changePassword" },
  ],
};

interface SidebarProps {
  role: "ADMIN" | "USER";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const items = sidebarItems[role];
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        height: "calc(100% - 64px)",
        top: 64,
        position: "fixed",
      }}
    >
      <List sx={{ paddingTop: "70px", width: "220px" }}>
        {items.map((item) => (
          <ListItem
            button
            key={item.label}
            component={NavLink}
            to={item.path}
            activeClassName="active-link"
            sx={{
              "&.active-link": {
                backgroundColor: "primary.main",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <ListItemText primary={item.label} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
