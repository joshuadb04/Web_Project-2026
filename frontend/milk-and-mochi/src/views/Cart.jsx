import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router";
import { useOrder } from "../hooks/apiHooks.js";
import { UserContext } from "../contexts/UserContext.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { postOrder, postOrderItem } = useOrder();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { cart, setCart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const handleCheckout = async () => {
    try {
      const result = await postOrder({
        user_id: user.user_id,
        status: "pending",
      });

      const orderId = result.result.order_id;

      for (const item of cart) {
        await postOrderItem({
          item_id: item.item_id,
          quantity: item.quantity,
          order_id: orderId,
        });
      }

      setCart([]);
      setOrderPlaced(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="mx-auto mt-22.5 min-h-screen w-full max-w-375 bg-[#fff8fb] px-5 py-18">
      <h2 className="text-center text-4xl font-semibold text-[#607FA3]">
        Your Cart
      </h2>

      {orderPlaced ? (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-[#83a997]">
            Order placed!
          </h2>
          <p className="mt-2 text-[#574752]">Thank you for your order!</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-[#607FA3]">
            Your cart is empty :(
          </h2>

          <p className="mt-2 text-[#574752]">
            Go to the menu and add some delicious treats!
          </p>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="mt-3 rounded-full bg-[#d982a8] px-3 py-1 font-semibold text-white transition hover:bg-[#b96891]"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-5">
            {cart.map((item) => (
              <div
                key={item.item_id}
                className="flex items-center justify-between rounded-2xl border-2 border-[#f3dce6] bg-white p-5"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#574752]">
                    {item.name}
                  </h3>

                  <p className="text-[#83a997]">{item.price} €</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.item_id)}
                    className="size-8 rounded-full bg-[#f3dce6] font-semibold text-[#574752]"
                  >
                    -
                  </button>

                  <span className="font-semibold text-[#574752]">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.item_id)}
                    className="size-8 rounded-full bg-[#f3dce6] font-semibold text-[#574752]"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.item_id)}
                    className="rounded-full bg-[#d982a8] px-4 py-2 font-semibold text-white transition hover:bg-[#b96891]"
                  >
                    Remove
                  </button>

                  <p className="font-semibold text-[#574752]">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <p className="text-2xl font-semibold text-[#574752]">
              Total:
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
              €
            </p>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleCheckout}
              className="rounded-full bg-[#607FA3] px-6 py-3 font-semibold text-white transition hover:bg-[#506d8f]"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
