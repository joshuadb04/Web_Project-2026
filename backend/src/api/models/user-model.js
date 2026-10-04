import promisePool from "../../utils/database.js";
import bcrypt from "bcrypt";

const addUser = async (user) => {
  const { first_name, last_name, email, password } = user;
  const role = "user";
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (first_name, last_name, password, email, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [first_name, last_name, hashedPassword, email, role];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { user_id: rows.insertId };
};

const findUserByEmail = async (email) => {
  const [rows] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM users WHERE user_id = ?", [id]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const updateUser = async (user, id) => {
  const { first_name, last_name, email, birthdate, filename } = user;

  const sql = `
    UPDATE users
    SET first_name = ?, last_name = ?, email = ?, birthdate = ?, filename = ?
    WHERE user_id = ?
  `;

  const params = [first_name, last_name, email, birthdate, filename, id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "User updated." };
};

const updatePassword = async (password, id) => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    UPDATE users
    SET password = ?
    WHERE user_id = ?
  `;

  const params = [hashedPassword, id];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return { message: "Password updated." };
};

export { addUser, findUserByEmail, findUserById, updateUser, updatePassword };
