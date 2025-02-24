import {
  CreditCard,
  FavoriteBorder,
  LocalShipping,
  Shield,
  ShoppingCart,
  WorkspacePremium,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductById,
} from "../../../State/customer/productSlice";
import {
  addItemToCart,
  fetchUserCart,
} from "../../../State/customer/cartSlice";
import { AddProductToWishlist } from "../../../State/customer/wishlistSlice";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);
  const [activeImage, setActiveImage] = useState(0);
  const { cart } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
      dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
      dispatch(fetchAllProducts({ pageNumber: 0 }));
    }
  }, [productId]);

  useEffect(() => {
   
    if (product.product && product.products.length > 0) {
      const similar = product.products.filter(
        (prod: any) =>
          prod.category?.name === product.product?.category?.name &&
          prod.id !== product.product?.id
      );
      setSimilarProducts(similar);
    }
  }, [product.product, product.products]);

   const handleWishlist = () => {
       dispatch(AddProductToWishlist(Number(productId)));
    };
  

  const handleActiveImage = (value: number) => () => {
    setActiveImage(value);
  };

  const handleAddItemCart = (value: any) => {
    const request = {
      productId: productId ? Number(productId) : undefined,
      size: "M",
      quantity: Number(value),
    };

    dispatch(
      addItemToCart({ jwt: localStorage.getItem("jwt") || "", request })
    );
  };

  const isProductInCart = cart.cart?.cartItems.some(
    (item) => item.product.id === Number(productId)
  );

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full  lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item: any, index) => (
              <img
                onClick={handleActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg primary">
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">
            {product.product?.title}
          </p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: "#2b82e6", fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span className="text-gray-800">234 Ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">
                ₹ {product.product?.sellingPrice}/-
              </span>
              <span className="line-through text-gray-400">
                ₹ {product.product?.mrpPrice}{" "}
              </span>
              <span className="primary-color font-semibold">
                {product.product?.discountPercent}%
              </span>
            </div>

            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4 text-gray-600 ">
              <Shield sx={{ color: "#2b82e6" }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <WorkspacePremium sx={{ color: "#2b82e6" }} />
              <p>100% Money back guarantee</p>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <LocalShipping sx={{ color: "#2b82e6" }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <CreditCard sx={{ color: "#2b82e6" }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {isProductInCart ? (
              <Button
                onClick={() => navigate("/cart")}
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart />}
                sx={{ py: "1rem", font: "bold" }}
              >
                Go to cart
              </Button>
            ) : (
              <Button 
                onClick={() => handleAddItemCart(1)}
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart />}
                sx={{ py: "1rem", font: "bold" }}
              >
                {" "}
                Add to cart
              </Button>
            )}

            <Button onClick={handleWishlist}
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              Wishlist
            </Button>
          </div>

          <div className="mt-5  text-sm text-gray-600 text-justify">
            {product.product?.description}
          </div>
          <div className="mt-7 space-y-5">
            <ReviewCard  item={product.product} />
            <Divider />
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className=" ml-4 text-lg font-bold">Similar Products</h1>
        <div className="pt-5">
          <SimilarProduct item={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
