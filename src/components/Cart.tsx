import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  emptyCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, setCart, emptyCart }) => {
  const [createDate, setCreateDate] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchCreateDate = async () => {
      try {
        const response = await fetch(`${apiUrl}/cart`);
        const data = await response.json();
        setCreateDate(data.createDate);
      } catch (error) {
        console.error("Error fetching create date:", error);
        toast.error("Error al cargar la fecha de creación");
      }
    };

    fetchCreateDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/cart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
      toast.success("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      const response = await fetch(`${apiUrl}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, quantity }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la cantidad");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar la cantidad");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4 text-left ml-4">
        Carrito de compra
        {cart.length > 0 && createDate && (
          <span className="text-sm pl-2 text-gray-500">
            {new Date(createDate).toLocaleString("es-AR", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        )}
      </h2>
      <ul className="flex gap-[6.7em] justify-left w-full p-4">
        <li className="text-center font-semibold">Cant</li>
        <li className="text-center font-semibold">Nombre</li>
        <ul className="flex gap-4">
          <li className="text-center font-semibold whitespace-nowrap">
            Precio Unitario
          </li>
          <li className="text-center font-semibold whitespace-nowrap">
            Precio Total
          </li>
        </ul>
      </ul>

      {cart.length === 0 ? (
        <h4 className="text-sm text-gray-500 m-auto w-[30em] bg-gray-500 bg-opacity-50 p-4 rounded-lg">
          No hay productos en el carrito aún, prueba agregando alguno con su ID
          y la cantidad que deseas ingresar.
        </h4>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        ))
      )}

      {cart.length > 0 && (
        <>
          <section className="flex items-center justify-between mx-8">
            <h3>Cantidad total de items: {totalQuantity}</h3>
            <h2 className="font-bold">
              Total Carrito: ${totalPrice.toFixed(2)}
            </h2>
          </section>

          <button
            onClick={emptyCart}
            className="px-4 py-2 bg-[#db5026] hover:bg-[#b43d2d] text-white rounded mt-4"
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
