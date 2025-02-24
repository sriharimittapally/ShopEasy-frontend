import { Divider } from "@mui/material";
import ReviewCard from "./ReviewCard";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/sari/x/a/i/free-zuri-clemira-unstitched-original-imah3fk7fx3hb7jk.jpeg?q=70"
          alt=""
        />
        <div>
          <div>
            <p className="font-bold text-xl">Chennai Silks</p>
            <p className="text-lg textgray-600">Women black saree</p>
          </div>

          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">₹ 400/-</span>
              <span className="line-through text-gray-400">₹ 900 </span>
              <span className="primary-color font-semibold">60%</span>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {[1,1,1,1,1,1,1,1].map((item)=> <div className="space-y-3"><ReviewCard/>
      <Divider/>
      </div>)}
      </section>
    </div>
  );
};

export default Review;
