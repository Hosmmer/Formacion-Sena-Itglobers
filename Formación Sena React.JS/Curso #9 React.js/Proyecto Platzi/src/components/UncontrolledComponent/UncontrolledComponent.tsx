import { useRef } from "react";

export const UncontrolledInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = () => {
    const productName = inputRef.current?.value.trim();

    if (productName) {
      alert(`Producto añadido: ${productName} 🛒`);
    } else {
      alert("Por favor, ingresa el nombre de un producto.");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nombre del producto, Ej:Manzana"
      />
      <button onClick={handleSubmit}>Añadir Al Carrito</button>
    </div>
  );
};
