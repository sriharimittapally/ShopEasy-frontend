import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAppSelector } from "../../../../State/Store";

const Deal = () => {
  const { customer } = useAppSelector((store) => store);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default: 6 cards
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200, // Large screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024, // Desktops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // Small tablets & large mobiles
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 360, // Small mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-5 px-5 lg:px-20">
      <Slider {...settings}>
        {customer.homePageData?.deals.map((item) => (
          <DealCard key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Deal;
