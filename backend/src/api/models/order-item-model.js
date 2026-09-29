import promisePool from "../../utils/database.js";

const listAllOrderItems = async () => {
  const [rows] = await promisePool.query("SELECT * FROM order_items");

  return rows;
};

const findOrderItemById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM order_items WHERE order_item_id = ?", [id]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addOrderItem = async (orderItem) => {
  const { item_id, quantity, order_id } = orderItem;

  const [menuItems] = await promisePool.query("SELECT price FROM menu_items WHERE item_id = ?", [item_id]);

  if (menuItems.length === 0) {
    return false;
  }

  const total_cost = menuItems[0].price * quantity;

  const sql = `
    INSERT INTO order_items (item_id, quantity, order_id, total_cost)
    VALUES (?, ?, ?, ?)
  `;

  const params = [item_id, quantity, order_id, total_cost];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { order_item_id: rows.insertId };
};

const modifyOrderItem = async (orderItem, id) => {
  const sql = promisePool.format("UPDATE order_items SET ? WHERE order_item_id = ?", [orderItem, id]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

const removeOrderItem = async (id) => {
  const [rows] = await promisePool.execute("DELETE FROM order_items WHERE order_item_id = ?", [id]);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

export { listAllOrderItems, findOrderItemById, addOrderItem, modifyOrderItem, removeOrderItem };
