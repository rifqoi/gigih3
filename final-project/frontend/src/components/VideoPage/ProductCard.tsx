import React from "react";

type ProductCard = {
  title: string;
  thumbnailURL: string;
  price: string;
};

const ProductCard: React.FC<ProductCard> = ({ title, thumbnailURL, price }) => {
  return (
    <>
      <div className="w-52 flex-shrink-0 overflow-hidden rounded-md bg-zinc-800">
        <img src={thumbnailURL} alt="" />
        <h2 className="flex justify-center text-white">{title}</h2>
        <h2 className="flex justify-center text-white">Rp {price}</h2>
      </div>
    </>
  );
};

export default ProductCard;
