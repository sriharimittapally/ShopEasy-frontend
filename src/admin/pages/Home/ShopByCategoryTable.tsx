import { useAppSelector } from "../../../State/Store";
import HomeCategoryTable from "./HomeCategoryTable"


const ShopByCategoryTable = () => {
   const {customer}= useAppSelector(store=>store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.shopByCategories || []} />
    </div>
  )
}

export default ShopByCategoryTable