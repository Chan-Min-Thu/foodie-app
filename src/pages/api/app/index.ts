import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if(req.method === "GET"){

  const tableId = Number(req.query.tableId)
  const isOrderAppRequest =  tableId;
 
  if(isOrderAppRequest){
    //find table

    const table = await prisma.table.findFirst({
      where: { id:tableId,isArchived:false },
    });
    // find locationIds
    const locationId = table?.locationId
    const location = await prisma.location.findFirst({ where:{id:locationId,isArchived:false }});
    const companyId = location?.companyId
    // const locationIds = locations.map((item) => item.id);

    const company = await prisma.company.findFirst({where:{id:companyId}})

    //find MenuCategories
    let menuCategories = await prisma.menuCategory.findMany({
      where: { companyId,isArchived:false },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    
    //find DisabledMenuCategoryLocation
    const disabledMenuCategoryIds  = (await prisma.disabledMenuCategoryLocation.findMany({where:{locationId}})).map(item=>item.menuCategoryId)
    // console.log("d",disabledMenuCategoryIds)
    menuCategories = menuCategories.filter(item=>!disabledMenuCategoryIds.includes(item.id))
    //find Menus
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds },isArchived:false },
    }); //filter to get menuCategorymenuarray inside many of menuCategorymenus
  
   
    const menuIds = menuCategoryMenus.map((item) => item.menuId);

    const disabledMenuIds = (await prisma.disabledMenuLocation.findMany({where:{locationId,isArchived:false}})).map(item=> item.menuId)

    let menus = await prisma.menu.findMany({
      where: { id: { in: menuIds },isArchived:false },
    });
    menus = menus.filter(item=> !disabledMenuIds.includes(item.id))

    

    //find addOnCategories
    const addOnCategoryMenus = await prisma.addOnCategoryMenu.findMany({
      where: { menuId: { in: menuIds },isArchived:false},
    });
    const addOnCategoryIds = addOnCategoryMenus.map(
      (item) => item.addOnCategoryId
    );


    const addOnCategories = await prisma.addOnCategory.findMany({
      where: {id:{in:addOnCategoryIds},isArchived:false}
    });

    //find addons
    const addons = await prisma.addOn.findMany({
      where: { addOnCategoryId:{ in: addOnCategoryIds } ,isArchived:false },
    });

    //find tableIds 
    const tableIds = (await prisma.table.findMany({where:{locationId:locationId}})).map((item)=>item.id) 

    //find orders 
    const orders = await prisma.order.findMany({where:{tableId:tableId}})
  
    return res.status(200).json({
      menuCategories,
      menus,
      addOnCategories,
      addOnCategoryMenus,
      addons,
      tables:[],
      orders,
      locations:[],
      company,
      menuCategoryMenus,
      disabledMenuCategoryLocation:[],
      disabledMenuLocation:[]
    });
  }
  else{
  if (!session) return res.status(401).send("Unauthorized");
  const name = session.user?.name as string;
  const email = session.user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });

  if (!dbUser) {
    //1. create new company and assign to newUser
    const newCompanyName = "Shwe Mandalay";
    const newCompanyStreet = "62 street,132 and 133 bet";
    const newCompanyTownship = "Pyi Gyi Tagon";
    const newCompanyCity = "Mandalay"
    const company = await prisma.company.create({
      data: { name: newCompanyName, street: newCompanyStreet,township:newCompanyTownship,city:newCompanyCity },
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
    
    const menu = await prisma.menu.create({
      data: { name: newMenuName, price: 1000,imgUrl:""},
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

    const locationStreet = "62 street,132 and 133 bet";
    const locationTownship = "Pyi Gyi Tagon";
    const locationCity = "Mandalay";
    const location = await prisma.location.create({
      data: {street:locationStreet,township:locationTownship,city:locationCity, companyId: company.id },
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
    // find company
    const company = await prisma.company.findFirst({where:{id:companyId}})
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
   
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
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
    const tableIds = tables.map(item=> item.id);
  
    const orders = await prisma.order.findMany({where:{tableId:{in:tableIds}}})
    return res.status(200).json({
      company,
      menuCategories,
      menus,
      addOnCategories,
      addOnCategoryMenus,
      addons,
      tables,
      locations,
      orders,
      menuCategoryMenus,
      disabledMenuCategoryLocation,
      disabledMenuLocation
    });
  }
}}
  res.status(404).send("Method is not allowed.");
};
export default handler;
