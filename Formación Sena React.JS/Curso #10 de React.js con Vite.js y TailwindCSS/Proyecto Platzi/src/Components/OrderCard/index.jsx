// Utils
import { TrashIcon } from "@heroicons/react/24/solid";

const OrderCard = ({ product, removeProduct }) => {
  const { title, price, image, id } = product;

  const renderDeleteIcon = () => {
    if (removeProduct) {
      return (
        <TrashIcon
          className="h-4 w-20 text-red-500 cursor-pointer"
          onClick={() => removeProduct(id)}
        />
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white drop-shadow-md m-2 rounded-lg">
      {/* Imagen y título */}
      <div className="flex items-center mb-4 sm:mb-0">
        <figure className="w-20 h-30  bg-slate-300 rounded-lg overflow-hidden">
          <img
            className="w-auto h-auto object-cover over"
            src={image}
            alt={title}
          />
        </figure>
        <p className="ml-4 text-xs font-light">{title}</p>
      </div>

      {/* Precio */}
      <div>
        <p className="text-sm font-normal ">${price}</p>
      </div>

      {/* Icono de eliminar */}
      {renderDeleteIcon()}
    </div>
  );
};

export default OrderCard;
