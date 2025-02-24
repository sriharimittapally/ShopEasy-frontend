import { useFormik } from "formik";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Grid2, TextField } from "@mui/material";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      console.log("formik submitted", values);
      const formatedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      console.log("fromatted values:", formatedValues);
    },
  });
  return (
    <div >
      <h1 className="text-2xl font-bold  primary-color pb-5 text-center ">Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="code"
                label="Coupon Code"
             
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="discountPecentage"
                label="Discount Percentage"
              
             
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DatePicker
              name="validityStartDate"
              sx={{width:"100%"}}
              label="Validity Start Date"
              value={formik.values.validityStartDate}
              onChange={formik.handleChange}
              />
              
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
            <DatePicker
              name="validityEndDate"
              sx={{width:"100%"}}
              label="Validity End Date"
              value={formik.values.validityEndDate}
              onChange={formik.handleChange}
              />
              
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
              
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
                required
              />
            </Grid2>
            <Grid2 size={{xs:12}}>
              <Button variant="contained" fullWidth sx={{py:".8rem"}}>
                Create Coupon
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
