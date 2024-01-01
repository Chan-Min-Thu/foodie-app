import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice"
import appReducer from "./slice/appSlice"
import menuCategoryReducer from "./slice/menuCategorySlice";
import addonCategoryReducer from "./slice/addonCategorySlice";
import addonReducer from "./slice/addonSlice";
import tableReducer from "./slice/tableSlice";
import locationReducer from "./slice/locationSlice";
import menuCategoryMenuReducer from "./slice/menuCategoryMenuSlice";
import addonCategoryMenuReducer from "./slice/addonCategoryMenuSlice";
import snackBarReducer from "./slice/snackBarSlice";
import disabledMenuCategoryLocationReducer from "./slice/disabledMenuCategoryLocation"
import disabledMenuLocationReducer from "./slice/disabledMenuLocation"
import cartsReducer from "./slice/cartSlice"
import orderReducer from "./slice/orderSlice"
import companyReducer from "./slice/companySlice"

export const store = configureStore({
  reducer: {
    app:appReducer,
    menu:menuReducer,
    menuCateogry:menuCategoryReducer,
    menuCategoryMenu:menuCategoryMenuReducer,
    addonCategory:addonCategoryReducer,
    addonCategoryMenu:addonCategoryMenuReducer,
    addon:addonReducer,
    table:tableReducer,
    location:locationReducer,
    snackBar:snackBarReducer,
    disabledMenuCategoryLocation:disabledMenuCategoryLocationReducer,
    disabledMenuLocation:disabledMenuLocationReducer,
    carts:cartsReducer,
    order:orderReducer,
    company:companyReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch