import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

interface Props {
  item: {
    id: string;
    title: string;
    icon?: any;
    url?: string;
    type: string;
    children?: {
      id: string;
      title: string;
      type: string;
      url?: string;
      icon?: any;
      breadcrumbs: boolean;
    }[];
  };
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const theme = useTheme();

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: "1rem" }} /> : false;

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  const isSelected = true;

  return (
    <ListItemButton
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: `${level * 28}px`,
        py: level === 1 ? 1.25 : 1,
        "&:hover": {
          bgcolor: "primary.lighter",
        },
        "&.Mui-selected": {
          bgcolor: "primary.lighter",
          borderRight: `2px solid ${theme.palette.primary.main}`,
          color: iconSelectedColor,
          "&:hover": {
            color: iconSelectedColor,
            bgcolor: "primary.lighter",
          },
        },
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}

      <ListItemText
        primary={
          <Typography
            variant="h6"
            sx={{ color: isSelected ? iconSelectedColor : textColor }}
          >
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
