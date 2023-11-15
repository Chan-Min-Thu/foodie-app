import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ClassIcon from "@mui/icons-material/Class";
import TableBarIcon from "@mui/icons-material/TableBar";
import EggIcon from "@mui/icons-material/Egg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { theme } from "@/utlis/theme";

interface Props {
  open: boolean;
  setOpen:(value:boolean)=>void
}

const SideBar = ({ open ,setOpen}: Props) => {
    const matches = useMediaQuery(theme.breakpoints.between("xs","sm"))
    console.log("sidebar",open)
    return (
      <Box
        sx={{
          "&:matches":{minWidth:"30vw"},
          display:open?"block":matches?"none":"block",
          bgcolor: "success.main",
          minHeight: "90vh",
          borderTopRightRadius: 5,
        }}
      >
        {sidebarMenuItems.slice(0, 7).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: "#FFE194" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={()=>{matches && setOpen(false)}}>
                <ListItemIcon sx={{ color: "info.main",display:matches?"none":"block" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Divider sx={{ bgcolor: "secondary.main", mx: 2 }} />
        {sidebarMenuItems.slice(-1).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: "#FFE194" }}
          >
            <ListItem disablePadding >
              <ListItemButton onClick={()=>{matches && setOpen(false)}} >
                <ListItemIcon color="primary.main" sx={{ color: "info.main",display:matches?"none":"block" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </Box>
    );
  
};
export default SideBar;

export const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    label: "Addons",
    icon: <EggIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
