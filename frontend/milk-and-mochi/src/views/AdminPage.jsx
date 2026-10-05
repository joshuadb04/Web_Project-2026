import { useEffect, useState } from "react";
import { useMenu, useOrder } from "../hooks/apiHooks.js";

const Admin = () => {
  const { getMenu, deleteMenuItem, postMenuItem } = useMenu();
  const { getOrders, putOrder } = useOrder();

  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [dietary, setDietary] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getMenu();
        const allOrders = await getOrders();

        setMenuItems(items);
        setOrders(allOrders.filter((order) => order.status === "pending"));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await deleteMenuItem(id, token);

      setMenuItems(menuItems.filter((item) => item.item_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const newItem = {
      name,
      price,
      description,
      dietary,
      type,
    };

    try {
      const token = localStorage.getItem("token");

      const result = await postMenuItem(newItem, token);

      setMenuItems([
        ...menuItems,
        { ...newItem, item_id: result.result.item_id },
      ]);

      setName("");
      setPrice("");
      setDescription("");
      setDietary("");
      setType("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await putOrder(orderId, { status }, token);

      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="mx-auto mt-22.5 max-w-375 px-10 py-18">
      <h1 className="mb-6 text-4xl font-semibold">Admin</h1>

      <div className="flex gap-8">
        <div className="flex-1 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Menu Items</h2>

          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <div
                key={item.item_id}
                className="flex items-center justify-between rounded border border-[#dddddd] bg-[#f5f5f5] p-3"
              >
                <span>{item.name}</span>

                <button
                  type="button"
                  onClick={() => handleDelete(item.item_id)}
                  className="cursor-pointer rounded-full bg-[#ff2b59] px-4 py-2 text-white hover:bg-[#b96891]"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit w-175 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Add Item</h2>

          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="rounded border border-[#dddddd] p-2"
            />

            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Price"
              className="rounded border border-[#dddddd] p-2"
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
              className="rounded border border-[#dddddd] p-2"
            />

            <input
              value={dietary}
              onChange={(event) => setDietary(event.target.value)}
              placeholder="Dietary"
              className="rounded border border-[#dddddd] p-2"
            />

            <input
              value={type}
              onChange={(event) => setType(event.target.value)}
              placeholder="Type"
              className="rounded border border-[#dddddd] p-2"
            />

            <button
              type="submit"
              className="w-fit cursor-pointer rounded-full bg-[#83a997] px-5 py-2.5 font-semibold text-white hover:bg-[#628b78]"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Pending Orders</h2>

        {orders.length === 0 ? (
          <p className="text-[#574752]">No pending orders.</p>
        ) : (
          <div className="flex max-h-100 flex-col gap-3 overflow-y-auto">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="flex items-center justify-between rounded-xl border border-[#f3dce6] bg-[#fff8fb] p-4"
              >
                <div>
                  <p className="font-semibold text-[#574752]">
                    Order #{order.order_id}
                  </p>

                  <p className="text-[#83a997]">Total: {order.cost} €</p>

                  <p className="text-[#574752]">Status: {order.status}</p>
                </div>

                <select
                  defaultValue={order.status}
                  onChange={(event) =>
                    handleStatusChange(order.order_id, event.target.value)
                  }
                  className="rounded border border-[#dddddd] bg-white p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
