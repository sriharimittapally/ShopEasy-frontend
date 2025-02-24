import { Deal } from "../../../../types/dealTypes";

const DealCard = ({ item }: { item: Deal }) => {
  return (
    <div className="w-[13.8rem] bg-white shadow-lg overflow-hidden border border-gray-300 hover:shadow-2xl transition-transform hover:scale-105">
      <img
        className="w-full h-[12rem] object-cover object-top border-b-4 border-yellow-500"
        src={item.category.image}
        alt={item.category.name}
      />
      <div className="bg-gradient-to-b from-black to-gray-800 text-white p-4 text-center">
        <p className="text-lg font-semibold tracking-wide">{item.category.name}</p>
        <p className="text-3xl font-extrabold text-yellow-400">{item.discount}% OFF</p>
        <p className="text-sm mt-2 opacity-80">Limited Time Offer</p>
        <button className="mt-4 bg-yellow-400 text-black font-bold py-2 px-5 rounded-lg hover:bg-yellow-500 transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default DealCard;
