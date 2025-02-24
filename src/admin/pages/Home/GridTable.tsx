import { useAppSelector } from "../../../State/Store";
import HomeCategoryTable from "./HomeCategoryTable"


const GridTable = () => {
   const {customer}= useAppSelector(store=>store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.grid || []}/>
    </div>
  )
}

export default GridTable