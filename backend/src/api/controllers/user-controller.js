import { addUser, findUserByEmail } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postUser = async (req, res) => {
  const result = await addUser(req.body);

  if (result.user_id) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    res.sendStatus(400);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch === true) {
      const payload = {
        user_id: user.user_id,
        role: user.role,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      const options = {
        expiresIn: "24h",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);

      res.json({ message: "Success", token, user: payload });
    } else {
      const error = new Error("Invalid Credentials");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Invalid Credentials");
    error.status = 403;
    throw error;
  }
};
export { postUser, login };
