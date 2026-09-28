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

export { addUser, findUserByEmail };
