import { useAppSelector } from "@/store/hook";
import { CheckBox } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { AddOn } from "@prisma/client";
import exp from "constants";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  addonCategoryId: number;
  selectedAddons: AddOn[];
  setSelectedAddons: Dispatch<SetStateAction<AddOn[]>>;
}
const Addons = ({ addonCategoryId, selectedAddons, setSelectedAddons }: Props) => {
  const addonCategory = useAppSelector(
    (state) => state.addonCategory.items
  ).filter((item) => item.id === addonCategoryId);
//   const addons = useAppSelector((state)=> state.addon.items)
  const addons = useAppSelector((state) => state.addon.items).filter(
    (item) => item.addOnCategoryId === addonCategoryId
  );

  return (
    <Box>
      {addons.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <FormControlLabel
              control={
                addonCategory[0].isRequired ? (
                  <Radio
                    color="success"
                    checked={selectedAddons.find((i) => i.id === item.id) ? true : false}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>,
                      checked: boolean
                    ) =>{
                       const addonIds = addons.map(item=>item.id)
                       const otherAddons = selectedAddons.filter(addon=> !addonIds.includes(addon.id))
                       setSelectedAddons([...otherAddons,item])
                    }} 
                  />
                ) : (
                  <Checkbox
                    color="success"
                    checked={
                        selectedAddons.find((addon) => addon.id === item.id)
                        ? true
                        : false
                    }
                    onChange={(event,value) => {
                      if (value) {
                        setSelectedAddons([...selectedAddons, item]);
                      } else {
                        const otherAddons = selectedAddons.filter(
                          (i) => i.id !== item.id
                        );
                        setSelectedAddons([...otherAddons]);
                      }
                    }}
                  />
                )
              }
              label={item.name}
            />
            <Typography>{item.price}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
export default Addons;
