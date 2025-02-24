import { HomeCategory } from "../../../../types/homeCategoryTypes"


const ElecticCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <img className="object-contain h-10" src={item.image} alt="" />
        <h2 className="font-semibold text-sm">{item.name}</h2>
    </div>
  )
}

export default ElecticCategoryCard