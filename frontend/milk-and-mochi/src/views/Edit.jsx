import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useMenu } from "../hooks/apiHooks.js";

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { putMenuItem } = useMenu();

  const item = state.item;

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [dietary, setDietary] = useState(item.dietary);
  const [type, setType] = useState(item.type);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedItem = {
      name,
      price,
      description,
      dietary,
      type,
    };

    try {
      const token = localStorage.getItem("token");

      await putMenuItem(item.item_id, updatedItem, token);

      navigate("/menu");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="mx-auto mt-22.5 max-w-375 px-[10%] py-18">
      <div className="mx-auto max-w-250 rounded-3xl border-2 border-[#f3dce6] bg-white p-10 shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
        <h1 className="mb-8 text-4xl font-semibold text-[#574752]">
          Edit Menu Item
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label>
            Name
            <input
              className="mt-2 w-full rounded border border-[#999999] p-2.5"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            Price
            <input
              type="number"
              step="0.01"
              className="mt-2 w-full rounded border border-[#999999] p-2.5"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              className="mt-2 w-full rounded border border-[#999999] p-2.5"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label>
            Dietary
            <input
              className="mt-2 w-full rounded border border-[#999999] p-2.5"
              value={dietary}
              onChange={(event) => setDietary(event.target.value)}
            />
          </label>

          <label>
            Type
            <input
              className="mt-2 w-full rounded border border-[#999999] p-2.5"
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-fit rounded-full bg-[#d982a8] px-6 py-3 font-semibold text-white transition hover:bg-[#b96891]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
};

export default Edit;
