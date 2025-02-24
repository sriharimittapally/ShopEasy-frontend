import { useAppSelector } from "../../../../State/Store"
import ShopByCategoryCard from "./ShopByCategoryCard"

const ShopByCategory = () => {
  const {customer}= useAppSelector(store=>store);
  return (
    <div className="flex flex-wrap justify-center lg:justify-between gap-4 px-5 lg:px-20">
    {customer?.homePageData?.shopByCategories?.map((item, index) => (
      <ShopByCategoryCard key={index} item={item} />
    ))}
  </div>
  )
}

export default ShopByCategory