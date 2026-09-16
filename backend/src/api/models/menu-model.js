import promisePool from "../../utils/database.js";

const listAllMenuItems = async () => {
  const [rows] = await promisePool.query("SELECT * FROM menu_items");

  return rows;
};

const findMenuItemById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM menu_items WHERE item_id = ?", [id]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addMenuItem = async (menuItem) => {
  const { name, price, description, dietary, type } = menuItem;

  const sql = `
    INSERT INTO menu_items (name, price, description, dietary, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [name, price, description, dietary, type];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { item_id: rows.insertId };
};

const modifyMenuItem = async (menuItem, id) => {
  const sql = promisePool.format("UPDATE menu_items SET ? WHERE item_id = ?", [menuItem, id]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

const removeMenuItem = async (id) => {
  const [rows] = await promisePool.execute("DELETE FROM menu_items WHERE item_id = ?", [id]);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "success" };
};

export { listAllMenuItems, findMenuItemById, addMenuItem, modifyMenuItem, removeMenuItem };
