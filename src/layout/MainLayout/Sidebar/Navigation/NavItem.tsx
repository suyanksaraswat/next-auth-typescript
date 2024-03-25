import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  session: { user: CustomUser };
  item: {
    id: string;
    title: string;
    icon?: any;
    url?: string;
    type: string;
    allowed?: string[];
    children?: {
      id: string;
      title: string;
      type: string;
      url?: string;
      icon?: any;
      breadcrumbs: boolean;
      allowed?: string[];
    }[];
  };
  level: number;
}

const NavItem = ({ item, level, session }: Props) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: "1rem" }} /> : false;

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  const isSelected = pathname === item?.url;

  return !item?.allowed ||
    (item?.allowed &&
      session?.user?.role &&
      item?.allowed?.includes(session?.user?.role)) ? (
    <ListItemButton
      selected={isSelected}
      onClick={() => item.url && router.push(item.url)}
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
  ) : null;
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
