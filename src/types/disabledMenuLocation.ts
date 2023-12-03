import { DisabledMenuLocation } from "@prisma/client";

export interface disabledMenuLocationSlice {
    items:DisabledMenuLocation[],
    isLoading:boolean,
    error:Error | null
}