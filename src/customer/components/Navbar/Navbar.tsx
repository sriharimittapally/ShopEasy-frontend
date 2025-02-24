import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, FavoriteBorder, Storefront } from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { searchProduct } from "../../../State/customer/productSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, seller } = useAppSelector((store) => store);

  const handleChange= (e:any)=>{
    setSearch(e.target.value);
  }

  const handleSearchSubmit = () => {
    console.log("search params:",search);
    dispatch(searchProduct({query:search}));
  setSearch("");
  };

  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center  justify-between  px-5 lg:px-20 h-[70px] border-b border-gray-200 shadow">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon className="text-gray-800" />
                </IconButton>
              )}
              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer text-3xl md:text-2xl primary-color font-bold"
              >
                ShopEasy
              </h1>
            </div>
            <ul className="flex items-center font-medium text-gray-800 ">
              {mainCategory.map((item, index) => (
                <li
                  key={index}
                  onMouseLeave={() => {
                    setShowCategorySheet(false);
                  }}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  className=" mainCategory text-gray-700 hover:text-[#2b82e6] hover:border-b-2 h-[70] px-4 border-[#2b82e6]"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <div className="flex items-center justify-center">
              <TextField
                id="standard-basic"
                placeholder="Search anything..."
                variant="standard"
                value={search}
                onChange={handleChange}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#f8f9fa",
                    borderRadius: "25px",
                    padding: "5px 10px",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        onClick={handleSearchSubmit}
                        className="cursor-pointer"
                        sx={{ color: "gray" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "250px",
                }}
              />
            </div>

            {auth.user || seller.profile ? (
              <Button
                onClick={
                  auth.user
                    ? () => navigate("/account/orders")
                    : () => navigate("/seller/account")
                }
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                />
                <h1 className="font-semibold hidden lg:block">
                  {auth.user?.fullName}
                  {seller.profile?.sellerName}
                </h1>
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")} variant="contained">
                Login
              </Button>
            )}
            {auth.user && (
              <IconButton onClick={() => navigate("/wishlist")}>
                <FavoriteBorder sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            {auth.user && (
              <IconButton onClick={() => navigate("/cart")}>
                <ShoppingCart className="text-gray-700" />
              </IconButton>
            )}
            {!seller.profile && isLarge && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<Storefront />}
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        {showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20 border "
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </>
  );
};

export default Navbar;
