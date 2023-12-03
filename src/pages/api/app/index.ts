import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // console.log(session);
  if (!session) return res.status(401).send("Unauthorized");
  const name = session.user?.name as string;
  const email = session.user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  // console.log("unique",dbUser)
  if (!dbUser) {
    //1. create new company and assign to newUser
    const newCompanyName = "Shwe Mandalay";
    const newCompanyAddress = "62 street,132 and 133 bet, Pyi Gyi Tagon Township";
    const company = await prisma.company.create({
      data: { name: newCompanyName, address: newCompanyAddress },
    });
    //2.create new User
    await prisma.user.create({ data: { name, email, companyId: company.id } });

    //3.create new menu Category
    const newMenuCategoryName = "Default Menu Category";
    const menuCategory = await prisma.menuCategory.create({
      data: { name: newMenuCategoryName, companyId: company.id },
    });
    //4.create new Menu
    const newMenuName = "Default Menu";
    const newMenuImgUrl =
      "https://media.istockphoto.com/id/1150368709/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%82%E0%B8%B2%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-confit.jpg?s=1024x1024&w=is&k=20&c=cVSDW5JY8uHc_kRF161aRgRPvXs7k89TEBMcx4-9Q7s=";
    const menu = await prisma.menu.create({
      data: { name: newMenuName, price: 1000, imgUrl: newMenuImgUrl },
    });

    //5.create a MenuCategoryMenu
    const menuCategoryMenu = await prisma.menuCategoryMenu.create({
      data: { menuCategoryId: menuCategory.id, menuId: menu.id },
    });

    //6 create a Addon Category

    const newAddonCategoryName = "Default Addon Category";
    const addOnCategory = await prisma.addOnCategory.create({
      data: { name: newAddonCategoryName },
    });

    //7. create new row in addon Category and Menu

    const addOnCategoryMenu = await prisma.addOnCategoryMenu.create({
      data: { menuId: menu.id, addOnCategoryId: addOnCategory.id },
    });

    //8. create new row in addon

    const newAddonNameOne = "Default add on 1";
    const newAddonNameTwo = "Default add on 2";
    const newAddonNameThree = "Default add on 3";

    const newAddon = [
      { name: newAddonNameOne,price:0, addOnCategoryId: addOnCategory.id },
      { name: newAddonNameTwo,price:0, addOnCategoryId: addOnCategory.id },
      { name: newAddonNameThree,price:0, addOnCategoryId: addOnCategory.id },
    ];

    const addon = await prisma.$transaction(
      newAddon.map((addon) => prisma.addOn.createMany({ data: addon }))
    );
    //9.create one row in location

    const locationName = "Chan Mya Tar Zi";
    const address = "72 street, 101 and 102 bet,Chan Mya Thar ZiTownship ";
    const location = await prisma.location.create({
      data: { name: locationName, address, companyId: company.id },
    });

    //10. create one row in tables
    const tableName = "Default table Name";
    const table = await prisma.table.create({
       data: { name: tableName, locationId: location.id ,assetUrl:""},
    });

    return res.status(200).json({
      data :{
        company,
        location,
        menuCategory,
        menu,
        menuCategoryMenu,
        addOnCategory,
        addOnCategoryMenu,
        addon,
        table,
      },
    });
  } else {
    // get company id
    const companyId = dbUser.companyId;

    // find locationIds
    const locations = await prisma.location.findMany({ where: { companyId,isArchived:false } });
    const locationIds = locations.map((item) => item.id);

    //find MenuCategories
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId,isArchived:false },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    
    //find DisabledMenuCategoryLocation

    const disabledMenuCategoryLocation  = await prisma.disabledMenuCategoryLocation.findMany({where:{menuCategoryId:{in:menuCategoryIds}}})
    
    //find Menus
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds },isArchived:false },
    }); //filter to get menuCategorymenuarray inside many of menuCategorymenus
    //  console.log(menuCategoryMenus)
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    //  console.log(menuIds)
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds },isArchived:false },
    });

    const disabledMenuLocation = await prisma.disabledMenuLocation.findMany({where:{id:{in:menuIds},isArchived:false}})

    //find addOnCategories
    const addOnCategoryMenus = await prisma.addOnCategoryMenu.findMany({
      where: { menuId: { in: menuIds },isArchived:false},
    });
    const addOnCategoryIds = addOnCategoryMenus.map(
      (item) => item.addOnCategoryId
    );

    // console.log("adonC:" ,addOnCategoryIds);

    const addOnCategories = await prisma.addOnCategory.findMany({
      where: {id:{in:addOnCategoryIds},isArchived:false}
    });

    //find addons
    const addons = await prisma.addOn.findMany({
      where: { addOnCategoryId:{ in: addOnCategoryIds } ,isArchived:false },
    });

    //find table

    const tables = await prisma.table.findMany({
      where: { locationId: { in: locationIds },isArchived:false },
    });
    //  console.log("Hello")
    return res.status(200).json({
      menuCategories,
      menus,
      addOnCategories,
      addOnCategoryMenus,
      addons,
      tables,
      locations,
      menuCategoryMenus,
      disabledMenuCategoryLocation,
      disabledMenuLocation
    });
  }
  // return res.status(200).json({})
  res.status(200).json(dbUser);
};
export default handle;
