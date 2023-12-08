import MenuCard from "@/components/ItemCard/MenuCard";
import { useAppSelector } from "@/store/hook";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderApp = () => {
    const {query} = useRouter()
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  const { isReady, ...router } = useRouter();
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const renderMenus = () => {
    const validMenuIds = menuCategoryMenus
      .filter(
        (item) =>
          item.menuCategoryId === selectedMenuCategory?.id
      )
      .map((i) => i.menuId);
    const validMenus = menus.filter(item=> validMenuIds.includes(item.id))
    console.log(validMenus)
    return validMenus.map(item=>{
     const href = { pathname:`order/menus/${item.id}`,query}
    return(
    <MenuCard key={item.id} menu={item} href={href}/>)})
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        TabIndicatorProps={{
            style:{background:'#1B9C85'}
        }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{".Mui-selected":{
            color:"#1B9C85",
            fontWeight:"bold"
        }}}
      >
        {menuCategories.map((item) => {
          return (
            <Tab
              key={item.id}
              label={item.name}
              sx={{}}
              onClick={() => setSelectedMenuCategory(item)}
            />
          );
        })}
      </Tabs>
      <Box sx={{display:"flex",flexDirection:"row",mt:4}}>
        {renderMenus()}
      </Box>
    </Box>
  );
};
export default OrderApp;
