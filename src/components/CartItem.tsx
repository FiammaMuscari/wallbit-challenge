import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: Product;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeItem,
  updateQuantity,
}) => {
  const [inputValue, setInputValue] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  useEffect(() => {
    setInputValue(item.quantity);
  }, [item.quantity]);

  const totalPrice = item.price * inputValue;

  const limitTitleToWords = (title: string, wordLimit: number) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : title;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setInputValue(newQuantity);
  };

  const handleBlur = async () => {
    if (inputValue !== item.quantity && inputValue > 0) {
      setIsUpdating(true);
      await updateQuantity(item.id, inputValue);
      setIsUpdating(false);
    } else if (inputValue <= 0) {
      setInputValue(item.quantity);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="max-w-[40em] bg-gradient-to-b from-[#096ea823] to-[#0390d14b] grid grid-cols-6 gap-4 items-center mb-4 p-4 border border-[#0391d1] rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input
        type="number"
        value={inputValue}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
        className={`w-full text-center text-white  bg-transparent border-none ${
          isUpdating ? "opacity-50" : ""
        }`}
        min="1"
        disabled={isUpdating}
      />
      <div className="relative w-full h-full flex justify-center items-center">
        {isImageLoading && (
          <div className="absolute flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute border-4 border-t-transparent border-[#0391d1] rounded-full w-full h-full animate-spin"></div>
            </div>
          </div>
        )}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-xl mx-auto border-[3px] border-[#34aecc7e]"
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </div>
      <h3 className=" text-lg ">{limitTitleToWords(item.title, 4)}</h3>
      <span className="text-sm text-gray-400 text-center">
        ${item.price.toFixed(2)}
      </span>
      <span className="text-md text-white text-center font-semibold">
        ${totalPrice.toFixed(2)}
      </span>
      <button
        onClick={() => removeItem(item.id)}
        disabled={isUpdating}
        className="bg-[#e4a42e] hover:bg-[#c99431] text-white px-4 py-1 rounded-full w-2 pb-2 text-center text-sm ml-auto flex items-center justify-center disabled:opacity-50"
      >
        x
      </button>
    </div>
  );
};

export default CartItem;
