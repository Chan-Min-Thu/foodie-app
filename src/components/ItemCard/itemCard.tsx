import { Link, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface Props {
  name: string;
  icon: ReactNode;
  subTitle?: string;
  href?: string;
}
const ItemCard = ({ name, icon, href }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{textDecoration:"none"}}>
        <Paper
          elevation={4}
          sx={{
            minWidth: 100,
            minHeight: 100,
            px: 2,
            py: 2,
            m: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {icon}
          <Typography
            sx={{ textAlign: "center", fontSize: 12, fontWeight: 500 }}
          >
            {name}
          </Typography>
        </Paper>
      </Link>
    );
  }
  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: 100,
        minHeight: 100,
        px: 2,
        py: 2,
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {icon}
      <Typography sx={{ textAlign: "center", fontSize: 12, fontWeight: 500 }}>
        {name}
      </Typography>
    </Paper>
  );
};
export default ItemCard;
