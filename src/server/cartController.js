import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartDataPath = path.join(__dirname, "data", "cartData.json");

const readCartData = async () => {
  try {
    const data = await fs.readFile(cartDataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      const initialData = { cart: [], createDate: null };
      await fs.writeFile(cartDataPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    throw error;
  }
};

const writeCartData = async (data) => {
  await fs.writeFile(cartDataPath, JSON.stringify(data, null, 2), "utf-8");
};

export const getCart = async (req, res) => {
  try {
    const cartData = await readCartData();
    res.json({
      cart: cartData.cart,
      createDate: cartData.createDate,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al leer el carrito" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const product = req.body;

    if (
      !product.id ||
      !product.title ||
      typeof product.price !== "number" ||
      typeof product.quantity !== "number" ||
      !product.image
    ) {
      return res
        .status(400)
        .json({ error: "Datos del producto incompletos o inválidos" });
    }

    if (product.price < 0 || product.quantity <= 0) {
      return res.status(400).json({ error: "Precio o cantidad inválidos" });
    }

    const cartData = await readCartData();

    if (cartData.cart.length === 0) {
      cartData.createDate = new Date().toISOString();
    }

    const existingProductIndex = cartData.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      cartData.cart[existingProductIndex].quantity += product.quantity;
    } else {
      cartData.cart.push(product);
    }

    await writeCartData(cartData);
    res.status(201).json(cartData.cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

export const emptyCart = async (req, res) => {
  try {
    await writeCartData({ cart: [], createDate: null });
    res.status(200).json({ message: "Carrito vaciado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!id || typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({ error: "ID o cantidad inválidos" });
    }

    const cartData = await readCartData();
    const existingProductIndex = cartData.cart.findIndex(
      (item) => item.id === id
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (quantity === 0) {
      cartData.cart.splice(existingProductIndex, 1);
    } else {
      cartData.cart[existingProductIndex].quantity = quantity;
    }

    await writeCartData(cartData);
    res.json(cartData.cart);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cantidad" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID de producto requerido" });
    }

    const cartData = await readCartData();
    const productId = Number(id);
    const existingProductIndex = cartData.cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    cartData.cart.splice(existingProductIndex, 1);
    await writeCartData(cartData);
    res.json(cartData.cart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
