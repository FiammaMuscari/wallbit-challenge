import { useEffect, useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const [productId, setProductId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/cart`);
      const data = await response.json();
      setCart(data.cart);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error al cargar el carrito");
    }
  };
  const addToCart = async (product: Product) => {
    if (product.quantity <= 0) {
      setErrorMessage("La cantidad debe ser mayor a cero.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Error al agregar al carrito");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
      const titleWords = product.title.split(" ").slice(0, 4).join(" ");
      toast.success(`✔ ${titleWords} agregado con éxito`);

      // Reset form
      setProductId(undefined);
      setQuantity("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al agregar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  const emptyCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/cart`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al vaciar el carrito");
      }

      setCart([]);
      toast.success("Carrito vaciado con éxito");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al vaciar el carrito");
    }
  };

  const handleAddToCartClick = async () => {
    if (productId === undefined || productId < 1 || productId > 20) {
      setErrorMessage("El ID del producto debe estar entre 1 y 20.");
      return;
    }

    const quantityNumber = Number(quantity);
    if (quantity === "" || quantityNumber <= 0) {
      setErrorMessage("La cantidad debe ser mayor a cero.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();

      const newProduct: Product = {
        id: data.id,
        title: data.title,
        price: data.price,
        quantity: quantityNumber,
        image: data.image,
      };

      await addToCart(newProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      setErrorMessage("Error al obtener el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
    if (errorMessage) setErrorMessage(null);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="p-4 mx-auto">
      <section className="flex justify-center items-center">
        <img src="/logo.webp" className="w-[18em] py-8" alt="logo_wallbit" />
        <a
          href="https://wallbit.io/"
          className="group pt-6 text-xs inline-flex items-center space-x-1 transition-all duration-300 ease-in-out hover:text-[#0391d1]"
          target="_blank"
        >
          <span>Nuestro sitio web</span>
          <span className="transform transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-[#0391d1]">
            &rarr;
          </span>
        </a>
      </section>

      <div className="mb-4 text-black flex space-x-2">
        <input
          type="number"
          placeholder="ID del Producto"
          value={productId || ""}
          onChange={handleProductIdChange}
          disabled={isLoading}
          className={`p-2 border rounded w-1/2 ${
            errorMessage ? "border-red-600" : "border-[#3d8bff]"
          }`}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={handleQuantityChange}
          disabled={isLoading}
          className={`p-2 border rounded w-1/2 ${
            errorMessage ? "border-red-600" : "border-[#3d8bff]"
          }`}
        />
        <button
          onClick={handleAddToCartClick}
          disabled={isLoading}
          className="px-4 py-2 bg-[#059dfb] text-gray-50 rounded transition-all duration-300 ease-in-out transform hover:bg-[#0391d1] hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? "Agregando..." : "Agregar"}
        </button>
      </div>

      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

      <section className="border border-[#0391d1] rounded m-2 p-2">
        <Cart cart={cart} setCart={setCart} emptyCart={emptyCart} />
      </section>

      <footer className="m-auto pt-4 text-center text-sm">
        <p>
          {new Date().getFullYear()} Powered by{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Fiamy &reg;
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
