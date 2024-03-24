// material-ui
import { Box, Typography } from "@mui/material";

// project import
import NavGroup from "./NavGroup";
import { DashboardOutlined } from "@ant-design/icons";

const dashboard = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard],
};

const Navigation = () => {
  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
