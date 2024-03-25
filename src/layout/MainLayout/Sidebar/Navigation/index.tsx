// material-ui
import { Box, Typography } from "@mui/material";

// project import
import NavGroup from "./NavGroup";
import { DashboardOutlined } from "@ant-design/icons";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

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
    {
      id: "cohort",
      title: "Cohort",
      type: "item",
      url: "/cohort",
      icon: DashboardOutlined,
      breadcrumbs: false,
      allowed: ["role1"],
    },
    {
      id: "analyze-criteria",
      title: "Analyze Criteria",
      type: "item",
      url: "/analyze-criteria",
      icon: DashboardOutlined,
      breadcrumbs: false,
      allowed: ["role2"],
    },
    {
      id: "rate-of-arrival",
      title: "Rate of Arrival",
      type: "item",
      url: "/rate-of-arrival",
      icon: DashboardOutlined,
      breadcrumbs: false,
      allowed: ["role3"],
    },
  ],
};

const menuItems = {
  items: [dashboard],
};

const Navigation = ({ session }: { session: { user: CustomUser } }) => {
  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} session={session} />;
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
