import { addOrder, findOrderById, listAllOrders, modifyOrder, removeOrder } from "../models/order-model.js";

/**
 * Get all orders.
 * @route GET /api/v1/orders
 */
const getOrderList = async (req, res) => {
  const orders = await listAllOrders();
  res.json(orders);
};

/**
 * Create a new order.
 * @route POST /api/v1/orders
 */
const postOrder = async (req, res, next) => {
  const result = await addOrder(req.body);

  if (result.order_id) {
    res.status(201);
    res.json({ message: "New order added.", result });
  } else {
    const error = new Error("Order not created");
    error.status = 400;
    next(error);
  }
};

/**
 * Get an order by ID.
 * @route GET /api/v1/orders/:id
 */
const getOrderById = async (req, res, next) => {
  const order = await findOrderById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    const error = new Error("Order not found");
    error.status = 404;
    next(error);
  }
};

/**
 * Update an order by ID.
 * @route PUT /api/v1/orders/:id
 */
const putOrder = async (req, res, next) => {
  const modify = await modifyOrder(req.body, req.params.id);

  if (modify) {
    res.json({ message: `Order ${req.params.id} updated` });
  } else {
    const error = new Error("Order not found");
    error.status = 404;
    next(error);
  }
};

/**
 * Delete an order by ID.
 * @route DELETE /api/v1/orders/:id
 */
const deleteOrder = async (req, res, next) => {
  const del = await removeOrder(req.params.id);

  if (del) {
    res.json({ message: `Order ${req.params.id} deleted` });
  } else {
    const error = new Error("Order not found");
    error.status = 404;
    next(error);
  }
};

export { getOrderList, postOrder, getOrderById, putOrder, deleteOrder };
