import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import { Product } from "../../../types/ProductTypes";

const ReviewCard = () => {
  
  
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={9}>
        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white "
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              S
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2 ">
            <div className="">
              <p className="font-semibold text-lg"> Srihari Mittapally</p>
              <p className="opacity-70">01-02-2025</p>
            </div>
          </div>
          <Rating readOnly value={4.5} precision={0.5} />
          <p>Value for money, product</p>
          <div>
         
             <img className="w-24 h-24 object-cover object-top" src="" alt="" />
            
         
            </div>
        </Grid2>
      </Grid2>
   <div>
   <IconButton>
            <Delete sx={{color:red[700]}}/>
        </IconButton>
   </div>
    </div>
  );
};

export default ReviewCard;
