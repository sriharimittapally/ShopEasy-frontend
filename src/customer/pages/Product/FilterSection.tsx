import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { colors } from "../../../data/Filter/color";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { discount } from "../../../data/Filter/discount";
import { price } from "../../../data/Filter/price";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();


  const handleColorToggle = () => {
    setExpandColor(!expandColor);
  };


  const updateFilterParams = (e:any) => {
    const {value, name} =  e.target;
    if(value){
      searchParams.set(name, value);
    }else{
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };


  const clearAllFilters = ()=>{
    console.log("clearAllFilters", searchParams)
    searchParams.forEach((value: any, key:any) =>{
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  }


  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r border-gray-300">
        <p className="text-lg font-semibold">Filters</p>
        <Button onClick={clearAllFilters} size="small" className="cursor-pointer font-semibold">
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">

        {/* Colors filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#2b82e6",
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup aria-labelledby="color"  onChange={updateFilterParams} defaultValue="" name="color">
              {colors.slice(0, expandColor ? colors.length : 5).map((item) => (
                <FormControlLabel
                  value={item.name}
                  control={<Radio />}
                  label={
                    <div className="flex gap-3 items-center">
                      <p>{item.name}</p>
                      <p
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full${
                          item.name === "White" ? " border border-gray-300" : ""
                        }`}
                      ></p>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleColorToggle}
              className="text-blue-300 cursor-pointer hover:text-blue-500 flex items-center"
            >
              {expandColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <Divider />
        {/* Discount filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#2b82e6",
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              onChange={updateFilterParams}
              defaultValue=""
              name="discount"
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        
        <Divider/>
        {/* Price filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#2b82e6",
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              onChange={updateFilterParams}
              defaultValue=""
              name="price"
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
