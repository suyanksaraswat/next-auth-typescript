import PropTypes from "prop-types";

// material-ui
import { Box, List, Typography } from "@mui/material";

// project import
import NavItem from "./NavItem";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  session: { user: CustomUser };
  item: {
    id: string;
    title: string;
    icon?: ForwardRefExoticComponent<
      Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
    >;
    url?: string;
    type: string;
    allowed?: string[];
    children: {
      id: string;
      title: string;
      type: string;
      url?: string;
      icon?: ForwardRefExoticComponent<
        Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
      >;
      breadcrumbs: boolean;
      allowed?: string[];
    }[];
  };
}

const NavGroup = ({ item, session }: Props) => {
  const drawerOpen = true;

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "collapse":
        return (
          <Typography
            key={menuItem.id}
            variant="caption"
            color="error"
            sx={{ p: 2.5 }}
          >
            collapse - only available in paid version
          </Typography>
        );
      case "item":
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            session={session}
          />
        );
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
