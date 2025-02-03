import { useContext, useState } from "react";
import { AppCartContext } from "../../Context";
import { PlusCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const Card = ({ product }) => {
  const {
    count,
    setCount,
    openProductDetail,
    setProductDetail,
    cartProducts,
    setCartProducts,
    openCartDetail,
  } = useContext(AppCartContext);
  const { category, title, price, image, id } = product;

  const showProductDetail = () => {
    openProductDetail();
    setProductDetail(product);
  };

  const addProductToCart = () => {
    setCount(count + 1);
    setCartProducts([...cartProducts, product]);
    openCartDetail();
  };

  const RenderIconTop = () => {
    const addedToCart = cartProducts.filter(product => product.id === id).length > 0;
    return addedToCart ? (
      <span className="text-blue-400">
        <CheckBadgeIcon className="h-6 w-6 bg-black-500 rounded-full" />
      </span>
    ) : (
      <span className="text-white cursor-pointer" onClick={addProductToCart}>
        <PlusCircleIcon className="h-6 w-6 text-black-500" />
      </span>
    );
  };

  return (
    <div className="w-full rounded-lg shadow-lg flex flex-col bg-white overflow-hidden">
      {/* Icono de carrito */}
      <div className="flex justify-end items-start p-2 ">
        <div className=" top-0 right-0 flex justify-center items-center bg-black/60 w-8 h-8 sm:w-6 sm:h-6 rounded-full">
          <RenderIconTop />
        </div>
      </div>

      {/* Imagen del producto */}
      <figure
        className="relative w-full h-48 sm:h-56 lg:h-64 px-2 pb-2 flex justify-center items-center cursor-pointer overflow-hidden"
        onClick={showProductDetail}
      >
        <img
          className="w-3/4 h-3/4 object-contain"
          src={image}
          alt={title}
        />
      </figure>

      {/* Detalles del producto */}
      <div className="flex flex-col p-4 bg-black/80 text-white rounded-b-lg flex-grow">
        {/* Categoría y precio */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-white/60 text-black text-xs p-1 rounded-lg">{category}</span>
          <span className="text-xl font-medium">${price}</span>
        </div>

        {/* Título del producto */}
        <p className="text-sm font-light">{title}</p>
      </div>
    </div>
  );
};

export default Card;
