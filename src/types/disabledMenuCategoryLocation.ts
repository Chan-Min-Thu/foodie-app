import { DisabledMenuCategoryLocation } from "@prisma/client";

export interface disabledMenuCategoryLocation{
   items:DisabledMenuCategoryLocation[],
   isLoading:boolean,
   error: Error | null
}