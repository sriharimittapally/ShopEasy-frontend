import { useAppSelector } from "../../../../State/Store"
import ElecticCategoryCard from "./ElecticCategoryCard"


const ElectricCategory = () => {
  const {customer} = useAppSelector(store=>store);
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b border-gray-100">
        {customer.homePageData?.electricCategories.map((item)=>
        <ElecticCategoryCard item={item} />)}
        
    </div>
  )
}

export default ElectricCategory