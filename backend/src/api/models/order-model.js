import promisePool from "../../utils/database.js";

const listAllOrders = async () => {
  const [rows] = await promisePool.query("SELECT * FROM orders");

  return rows;
};

const addOrder = async (order) => {
  const { user_id, status } = order;

  const sql = `
    INSERT INTO orders (user_id, cost, status)
    VALUES (?, ?, ?)
  `;

  const params = [user_id, 0, status];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { order_id: rows.insertId };
};

const updateOrderCost = async (order_id, cost) => {
  const sql = `
    UPDATE orders
    SET cost = ?
    WHERE order_id = ?
  `;

  const params = [cost, order_id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

const findOrderById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM orders WHERE order_id = ?", [id]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const modifyOrder = async (order, id) => {
  const sql = promisePool.format("UPDATE orders SET ? WHERE order_id = ?", [order, id]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

const removeOrder = async (id) => {
  const [rows] = await promisePool.execute("DELETE FROM orders WHERE order_id = ?", [id]);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

export { listAllOrders, addOrder, findOrderById, modifyOrder, removeOrder, updateOrderCost };
