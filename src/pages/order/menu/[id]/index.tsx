import AddonCategories from "@/components/AddonCategories";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button } from "@mui/material";
import { AddOn } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { genereteRandomIds } from "../../../../utlis/general/general";
import { CartItems } from "@/types/cart";
import { setCarts } from "@/store/slice/cartSlice";
import QuantitySelector from "@/components/QuatintySelector";
import { nanoid } from "nanoid";

const MenuDetails = () => {
  const {query,isReady, ...router } = useRouter();
  const carts = useAppSelector((state) => state.carts.items);
  const cartId = String(query.itemId);
  const tableId = query.tableId;
  const cart= carts.find((item)=> item.id === cartId)
  const menuId = Number(query.id);
  const {items:menus,isLoading} = useAppSelector((state) => state.menu);
  const menu = menus.find((item) => item.id === menuId);
  const addonCategoryMenu = useAppSelector(
    (state) => state.addonCategoryMenu.items
  ).filter((item) => item.menuId === menuId);
  const addonCategoryIds = addonCategoryMenu.map(
    (item) => item.addOnCategoryId
  );

  const addonCategories = useAppSelector(
    (state) => state.addonCategory.items
  ).filter((item) => addonCategoryIds.includes(item.id));

  const [value, setValue] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<AddOn[]>([]);
  const [isDisabled, setIsDiabled] = useState<boolean>(true);

  //for button disable (useIsDiabled);
  useEffect(() => {
    const requiredAddonCategory = addonCategories.filter(
      (item) => item.isRequired === true
    ).length;
    // const addonCategoryIds = addonCategories.map(item=> item.id);
    const minRequiredAddons = selectedAddons.filter((addon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === addon.addOnCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled = minRequiredAddons.length !== requiredAddonCategory;
    setIsDiabled(isDisabled);
  }, [selectedAddons, addonCategories]);
  
  useEffect(()=>{
    if(cart){
    setSelectedAddons(cart.addons)
    }
  },[cartId])

  const dispatch = useAppDispatch();

  if (!isReady || !menu) return null;
  const handleIncrease = () => {
    const increaseValue = value + 1;
    setValue(increaseValue);
  };
  const handleDecrease = () => {
    const decreaseValue = value === 1 ? 1 : value - 1;
    setValue(decreaseValue);
  };

  const handleCarts = () => {
    const newCart: CartItems = {
      id: cart ? cart.id :nanoid(7),
      menu: menu,
      addons: selectedAddons,
      quantity: value,
    };
    const pathname = cart ? "/order/carts":"/order"
    dispatch(setCarts(newCart));
    router.push({
      pathname,
      query:{tableId}
    });
  };
  return (
    <Box
      sx={{
        position:"relative",
        zIndex:{xs:2,sm:5},
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Image
        width={200}
        height={200}
        style={{ borderRadius: "50%", margin: "0 auto", paddingTop: "-200px" }}
        src={menu?.imgUrl || "/default-menu.png"}
        alt="menu-image"
      />
      <AddonCategories
        addonCategories={addonCategories}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />
      <QuantitySelector
        value={value}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={() => handleCarts()}
        sx={{
          width: "fit-content",
          my: 3,
          bgcolor: "success.main",
          mx: "auto",
        }}
      >
        {cart?"Update Carts":"Add To Carts"} 
      </Button>
    </Box>
  );
};

export default MenuDetails;
