import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { colors } from "../../../data/Filter/color";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/sellerProductSlice";
import { useNavigate } from "react-router-dom";


const categoryTwo:{[key: string]: any[]}={
  men:menLevelTwo,
  women:womenLevelTwo,
  // kids:[],
}

const categoryThree:{[key: string]: any[]}={
  men:menLevelThree,
  women:womenLevelThree,
  // kids:[],
}

  

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);

  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: 0,
      sellingPrice: 0,
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formik", values);
      dispatch(createProduct({request:values, jwt:localStorage.getItem("jwt")}));
      navigate("/seller/products")
    },
  });

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
     formik.setFieldValue("images",[...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const uploadImages = [...formik.values.images];
    uploadImages.splice(index, 1);
    formik.setFieldValue("images", uploadImages);
  };

  const childCategory = (categoryList: any[], parentCategoryId: string) => {
  console.log("Filtering category3 with parentCategoryId:", parentCategoryId);
  console.log("Available category3 data:", categoryList);
  const filteredCategories = categoryList.filter((child) => child.parentCategoryId === parentCategoryId);
  console.log("Filtered category3:", filteredCategories);
  return filteredCategories;
};

  
  





  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid2 container spacing={2}>
          <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 border-0  w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    key={index}
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=""
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            ></TextField>
          </Grid2>

          <Grid2 size={{ xs:12 }}>
            <TextField
              multiline
              fullWidth
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            ></TextField>
          </Grid2>
          <Grid2 size={{ xs: 12, md:4, lg:3 }}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            ></TextField>
          </Grid2>

          <Grid2 size={{ xs: 12 ,md:4, lg:3}}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            ></TextField>
          </Grid2>
          <Grid2 size={{ xs: 12, md:4, lg:3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {colors.map((color) => (
                  <MenuItem value={color.name}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "white" ? "border border-gray-300" : ""
                        }`}
                      ></span>

                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, md:4, lg:3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                label="Sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12 ,md:4, lg:4}}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {mainCategory.map((item) => (
                  <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, md:4, lg:4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category2-label">Second Category</InputLabel>
              <Select
  labelId="category2-label"
  id="category2"
  name="category2"
  value={formik.values.category2}
  onChange={(e) => {
    console.log("Selected Second Category:", e.target.value);
    formik.setFieldValue("category2", e.target.value);
    formik.setFieldValue("category3", ""); // Reset third category
  }}
>
  <MenuItem value=""><em>None</em></MenuItem>
  {(categoryTwo[formik.values.category] || []).map((item) => (
    <MenuItem key={item.categoryId} value={item.categoryId}>
      {item.name}
    </MenuItem>
  ))}
</Select>

              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, md:4, lg:4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category3-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category"
                name="category3"
                label="Third Category"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2
                  )?.map((item:any) => (
                    <MenuItem  key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              //disabled={sellerProduct.loading}
            >
              {false ? (
                <CircularProgress
                  size="small"
                  sx={{ width: "27px", height: "27px" }}
                />
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </div>
  );
};

export default AddProduct;
