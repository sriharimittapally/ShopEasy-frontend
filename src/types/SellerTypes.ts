
export interface Seller {
    id?: number;
    sellerName: string;
    otp:string,
    mobile: string;
    email: string;
    password: string;
    businessDetails: BusinessDetails;
    bankDetails: BankDetails;
    pickupAddress: PickupAddress;
    GSTIN: string;
    accountStatus?: string;
  }

  export interface BusinessDetails{
    businessName:string
  }

  export interface BankDetails{
    accountNumber:string,
    ifscCode:string,
    accountHolderName:string
  }

  export interface PickupAddress{
    name:string,
    mobile:string,
    pinCode:string,
    address:string,
    locality:string,
    city:string,
    state:string
  }

  export interface SellerReport{
    id:number,
    seller:Seller,
    totalEarnings:number,
    totalSales:number,
    totalRefunds:number,
    totalTax:number,
    netEarnings:number
    totalOrders:number,
    canceledOrders:number,
    totalTransactions:number
  }