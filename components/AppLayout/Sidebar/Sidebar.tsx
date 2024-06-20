import React from 'react';
import { Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";

const Sidebar = () => {
  const sidebarWidth = "270px";

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      PaperProps={{
        sx: {
          top: '70px',
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;