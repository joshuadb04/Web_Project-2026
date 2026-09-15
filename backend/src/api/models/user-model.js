import promisePool from "../../utils/database.js";
import bcrypt from "bcrypt";

const addUser = async (user) => {
  const { first_name, last_name, email, password } = user;
  const role = "user";
  const hashedPassword = bcrypt.hashSync(password, 10);

  const [result] = await promisePool.execute(
    "INSERT INTO users (first_name, last_name, password, email, role) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, hashedPassword, email, role],
  );
  return { user_id: result.insertId };
};

const findUserByEmail = async (email) => {
  const [rows] = await promisePool.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 1) {
    return rows[0];
  } else return false;
};

export { addUser, findUserByEmail };
