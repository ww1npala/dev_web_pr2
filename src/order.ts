import type { Order, OrderStatus } from "./types.js";

export function updateOrderStatus(
  order: Order,
  newStatus: OrderStatus
): Order {
  if (
    (order.status === "cancelled" || order.status === "delivered") &&
    newStatus !== order.status
  ) {
    throw new Error(
      `Неможливо змінити статус ${order.status} на ${newStatus}`
    );
  }

  return {
    ...order,
    status: newStatus,
    updatedAt: new Date()
  };
}

export function validateCustomerInput(input: unknown): string {
  if (typeof input !== "string") {
    throw new TypeError("Email повинен бути рядком");
  }

  const cleanedInput = input.trim();

  if (cleanedInput.length === 0) {
    throw new Error("Email не може бути порожнім");
  }

  if (!cleanedInput.includes("@")) {
    throw new Error("Некоректний формат email");
  }

  return cleanedInput;
}