import {
  addMenuItem,
  findMenuItemById,
  listAllMenuItems,
  modifyMenuItem,
  removeMenuItem,
} from "../models/menu-model.js";

const getMenuList = async (req, res) => {
  const menuItems = await listAllMenuItems();
  res.json(menuItems);
};

const getMenuItemById = async (req, res, next) => {
  const menuItem = await findMenuItemById(req.params.id);

  if (menuItem) {
    res.json(menuItem);
  } else {
    const error = new Error("Menu item not found");
    error.status = 404;
    next(error);
  }
};

const postMenuItem = async (req, res, next) => {
  const result = await addMenuItem(req.body);

  if (result.item_id) {
    res.status(201);
    res.json({ message: "New menu item added.", result });
  } else {
    const error = new Error("Menu item not created");
    error.status = 400;
    next(error);
  }
};

const putMenuItem = async (req, res, next) => {
  const modify = await modifyMenuItem(req.body, req.params.id);

  if (modify) {
    res.json({ message: `Menu item ${req.params.id} updated` });
  } else {
    const error = new Error("Menu item not found");
    error.status = 404;
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  const del = await removeMenuItem(req.params.id);

  if (del) {
    res.json({ message: `Menu item ${req.params.id} deleted` });
  } else {
    const error = new Error("Menu item not found");
    error.status = 404;
    next(error);
  }
};

export { getMenuList, getMenuItemById, postMenuItem, putMenuItem, deleteMenuItem };
