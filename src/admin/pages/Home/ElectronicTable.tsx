import { useAppSelector } from "../../../State/Store";
import HomeCategoryTable from "./HomeCategoryTable"


const ElectronicTable = () => {
   const {customer}= useAppSelector(store=>store);
  return (
    <div><HomeCategoryTable data={customer.homePageData?.electricCategories || []} /></div>
  )
}

export default ElectronicTable