import { Box } from "@mui/material";
import { ReactNode} from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";
import { useRouter } from "next/router";
// import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
    const router = useRouter();
    const {tableId } = router.query;
  const orderLink = tableId
  const BackofficeLink = router.pathname.includes("/backoffice")
  if(orderLink){
    return(<Box>
        <OrderLayout>
            {children}
        </OrderLayout>
    </Box>)
  }

  if(BackofficeLink){
    return(<Box>
        <BackofficeLayout>
            {children}
        </BackofficeLayout>
    </Box>)
  }
  return (
    <Box>
    {children}
    </Box>
  );
};
export default Layout;
