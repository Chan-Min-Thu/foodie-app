
  import { CompanySlice, UpdateCompanyOptions } from "@/types/company";
import { Tables, UpdateTableOptions } from "@/types/table";
  import { config } from "@/utlis/config";
  import { Company} from "@prisma/client";
  import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

  const initialState: CompanySlice = {
    item:null,
    isLoading: false,
    error: null,
  };
  

  
  export const updateCompany = createAsyncThunk(
    "company/updateCompany",
    async (option: UpdateCompanyOptions, thunkApi) => {
      const { id, name,street,township,city, onSuccess, isError } = option;
      console.log(city)
      try {
        const response = await fetch(`${config.apiBaseUrl}/company`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id, name,street,township,city }),
        });
        const { company } = await response.json();
  
        thunkApi.dispatch(setCompany(company));
        onSuccess && onSuccess();
      } catch (err) {
        isError && isError();
      }
    }
  );

  export const companySlice = createSlice({
    name: "Company",
    initialState,
    reducers: {
      setCompany: (state, action) => {
        state.item = action.payload;
      },

    }
  });
  
  export const { setCompany} = companySlice.actions;
  export default companySlice.reducer;
  
  
  