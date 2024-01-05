import MenuCard from "@/components/ItemCard/MenuCard";
import OrderAppHeader from "@/components/OrderAppHeader";
import { useAppSelector } from "@/store/hook";
import { RedoTwoTone } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { useEffect } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const Home = () => {
  const { isReady, ...router } = useRouter();
  const query = router.query;
  const tableId = Number(query.tableId);
  const isHome = router.pathname === "/order";

  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );
  const menus = useAppSelector((state) => state.menu.items);

  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);
  useEffect(() => {
    if (isReady && !tableId) router.push("/");
  }, [isReady]);

  const renderMenus = () => {
    const validMenuIds = menuCategoryMenus
      .filter((item) => selectedMenuCategory?.id === item.menuCategoryId)
      .map((item) => item.menuId);
    const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
    return validMenus.map((item) => {
      const href = { pathname: `order/menu/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  return (
    <Box sx={{ mx: 6, position: "relative" }}>
      <Box
        sx={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          position: "fixed",
          zIndex: 4,
          bgcolor:"white",
          top: { xs: 50, sm: 330 },
          width: "80vw",
          mx: "auto",
        }}
      >
        <ChevronLeftIcon sx={{display:{xs:"block",sm:"none"}}}/>
        <Tabs
          TabIndicatorProps={{ style: { background: "#1B9C85" } }}
          value={value}
          onChange={(evt, value) => setValue(value)}
          sx={{".Mui-selected": { color: "#1B9C85", fontWeight: "bold" } }}
        >
          {menuCategories.map((item) => {
            return (
              <Tab
                key={item.id}
                label={item.name}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
        <ChevronRightIcon sx={{display:{xs:"block",sm:"none"}}}/>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          mt:{xs:10,sm:40},
          height:"auto",
          position:"relative",
          zIndex:3,
          mb:30,
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {renderMenus()}
      </Box>
    </Box>
  );
};
export default Home;
