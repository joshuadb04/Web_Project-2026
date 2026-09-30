import { addUser, findUserByEmail } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postUser = async (req, res, next) => {
  const result = await addUser(req.body);

  if (result) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    const error = new Error("User not created");
    error.status = 400;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid Credentials");
    error.status = 403;
    next(error);
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error("Invalid Credentials");
    error.status = 403;
    next(error);
    return;
  }

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
};

const getUserByToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      const error = new Error("Token not found");
      error.status = 401;
      next(error);
      return;
    }

    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ user });
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export { postUser, login, getUserByToken };
