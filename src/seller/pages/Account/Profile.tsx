import { useAppSelector } from "../../../State/Store";
import { Card, CardContent, Avatar, Typography, Box, Divider, Button } from "@mui/material";
import { Email, Phone, AccountBalance, Home, Business, Edit } from "@mui/icons-material";

const Profile = () => {
  const { seller } = useAppSelector((store) => store);

  if (!seller) {
    return <Typography textAlign="center" color="gray" mt={5}>Loading...</Typography>;
  }

  return (
    <Box maxWidth="800px" mx="auto" px={3} py={5}>
      {/* Header Section */}
      <Box display="flex" alignItems="center" gap={3} pb={3} borderBottom="1px solid #ddd">
        <Avatar src={seller.profile.businessDetails?.logo} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">{seller.profile?.sellerName}</Typography>
          <Typography variant="body2" color="gray">{seller.profile?.businessDetails?.businessName}</Typography>
        </Box>
      </Box>

      {/* Personal Details Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <Business fontSize="small" color="primary" /> Personal Information
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography display="flex" alignItems="center" gap={1}><Email fontSize="small" /> {seller.profile.email}</Typography>
          <Typography display="flex" alignItems="center" gap={1}><Phone fontSize="small" /> {seller.profile.mobile}</Typography>
          <Typography display="flex" alignItems="center" gap={1}><AccountBalance fontSize="small" /> Status: <strong>{seller.profile.accountStatus}</strong></Typography>
        </CardContent>
      </Card>

      {/* Business Details Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <Home fontSize="small" color="success" /> Business Information
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Business Name:</strong> {seller.profile.businessDetails?.businessName}</Typography>
          <Typography><strong>Email:</strong> {seller.profile.businessDetails?.businessEmail}</Typography>
          <Typography><strong>Phone:</strong> {seller.profile.businessDetails?.businessMobile}</Typography>
          <Typography><strong>Address:</strong> {seller.profile.businessDetails?.businessAddress}</Typography>
          {seller.profile.businessDetails?.banner && (
            <Box mt={2}>
              <img src={seller.profile.businessDetails?.banner} alt="Business Banner" width="100%" height="150px" style={{ objectFit: "cover", borderRadius: "8px" }} />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <AccountBalance fontSize="small" color="secondary" /> Bank Information
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Account Holder:</strong> {seller.profile.bankDetails?.accountHolderName}</Typography>
          <Typography><strong>Account Number:</strong> {seller.profile.bankDetails?.accountNumber}</Typography>
          <Typography><strong>IFSC Code:</strong> {seller.profile.bankDetails?.ifscCode}</Typography>
        </CardContent>
      </Card>

      {/* Edit Profile Button */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" startIcon={<Edit />}>
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
