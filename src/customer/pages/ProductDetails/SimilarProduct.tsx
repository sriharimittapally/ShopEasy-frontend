import { Product } from "../../../types/ProductTypes";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = ({ item }: { item: Product[] }) => {
  if (!item || item.length === 0) {
    return <p className="text-center text-gray-500">No similar products found.</p>;
  }
  
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between  gap-4 gap-y-8">
      {item.map((item) => (
        <SimilarProductCard  item={item} />
      ))}
    </div>
  );
};

export default SimilarProduct;
