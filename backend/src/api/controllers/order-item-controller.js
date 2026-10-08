import {
  addOrderItem,
  findOrderItemById,
  listAllOrderItems,
  modifyOrderItem,
  removeOrderItem,
} from "../models/order-item-model.js";

import { updateOrderCost } from "../models/order-model.js";

/**
 * Get all order items.
 * @route GET /api/v1/order-items
 */
const getOrderItemList = async (req, res) => {
  const orderItems = await listAllOrderItems();
  res.json(orderItems);
};

/**
 * Get an order item by ID.
 * @route GET /api/v1/order-items/:id
 */
const getOrderItemById = async (req, res, next) => {
  const orderItem = await findOrderItemById(req.params.id);

  if (orderItem) {
    res.json(orderItem);
  } else {
    const error = new Error("Order item not found");
    error.status = 404;
    next(error);
  }
};

/**
 * Create an order item and update the order cost.
 * @route POST /api/v1/order-items
 */
const postOrderItem = async (req, res, next) => {
  const result = await addOrderItem(req.body);

  if (result.order_item_id) {
    const orderItems = await listAllOrderItems();

    const orderItemsForOrder = orderItems.filter((orderItem) => orderItem.order_id === req.body.order_id);

    const cost = orderItemsForOrder.reduce((total, orderItem) => total + Number(orderItem.total_cost), 0);

    await updateOrderCost(req.body.order_id, cost);

    res.status(201);
    res.json({ message: "New order item added.", result });
  } else {
    const error = new Error("Order item not created");
    error.status = 400;
    next(error);
  }
};

/**
 * Update an order item by ID.
 * @route PUT /api/v1/order-items/:id
 */
const putOrderItem = async (req, res, next) => {
  const modify = await modifyOrderItem(req.body, req.params.id);

  if (modify) {
    res.json({ message: `Order item ${req.params.id} updated` });
  } else {
    const error = new Error("Order item not found");
    error.status = 404;
    next(error);
  }
};

/**
 * Delete an order item by ID.
 * @route DELETE /api/v1/order-items/:id
 */
const deleteOrderItem = async (req, res, next) => {
  const del = await removeOrderItem(req.params.id);

  if (del) {
    res.json({ message: `Order item ${req.params.id} deleted` });
  } else {
    const error = new Error("Order item not found");
    error.status = 404;
    next(error);
  }
};

export { getOrderItemList, getOrderItemById, postOrderItem, putOrderItem, deleteOrderItem };
