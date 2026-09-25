import { calculateLineTotal, createProduct } from "./catalog.js";

import {
  updateOrderStatus,
  validateCustomerInput
} from "./order.js";

import {
  isCreditCardPayment,
  maskCardNumber,
  processPayment
} from "./payment.js";

import type {
  CartItem,
  Order,
  PaymentDetails,
  Product
} from "./types.js";

console.log("=== СИСТЕМА ОБРОБКИ ЗАМОВЛЕНЬ (E-COMMERCE CORE) ===");
console.log("");

const product1: Product = createProduct({
  id: 1,
  title: "Ноутбук MSI",
  price: 45000,
  description: "Потужний ноутбук",
  tags: ["ноутбук", "електроніка", "комп'ютер"],
  inStock: true,
  warrantyMonths: 24,
  powerWatts: 140,
  specs: ["Intel Core i7", 16]
});

const product2: Product = createProduct({
  id: 2,
  title: "Бездротова миша",
  price: 1200,
  description: "Бездротова миша",
  tags: ["миша", "електроніка", "аксесуари"],
  inStock: true,
  warrantyMonths: 12,
  specs: ["ARM Cortex", 2]
});

console.log("[Каталог товарів]");
console.log(`- Створено товар #${product1.id}: [${product1.title}] - ${product1.price} грн`);
console.log(`  CPU: ${product1.specs[0]}, RAM: ${product1.specs[1]} GB, Гарантія: ${product1.warrantyMonths} міс.`);
console.log(`- Створено товар #${product2.id}: [${product2.title}] - ${product2.price} грн`);
console.log(`  CPU: ${product2.specs[0]}, RAM: ${product2.specs[1]} GB, Гарантія: ${product2.warrantyMonths} міс.`);
console.log("");

const cart: CartItem[] = [
  { product: product1, quantity: 1 },
  { product: product2, quantity: 2 }
];

console.log("[Формування кошика]");
let totalOrderPrice = 0;

for (const [index, item] of cart.entries()) {
  const lineTotal = calculateLineTotal(item.product.price, item.quantity);
  totalOrderPrice += lineTotal;
  console.log(`${index + 1}. ${item.product.title} x ${item.quantity} = ${lineTotal} грн`);
}

console.log(`Загальна вартість замовлення: ${totalOrderPrice} грн`);
console.log("");

const customerEmail = validateCustomerInput("customer@example.com");

const order: Order = {
  orderId: "ord-98214-abc",
  customerEmail,
  items: cart,
  status: "pending",
  delivery: "courier",
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log("[Створення замовлення]");
console.log(`Замовлення ID: ${order.orderId}`);
console.log(`Клієнт: ${order.customerEmail}`);
console.log(`Доставка: ${order.delivery}`);
console.log(`Початковий статус: ${order.status}`);
console.log(`Час створення: ${order.createdAt.toISOString()}`);
console.log("");

let currentOrder = order;
currentOrder = updateOrderStatus(currentOrder, "processing");
console.log("[Зміна життєвого циклу]");
console.log(`Оновлення статусу: pending -> ${currentOrder.status}`);

currentOrder = updateOrderStatus(currentOrder, "shipped");
console.log(`Оновлення статусу: processing -> ${currentOrder.status}`);
console.log("");

const cardPayment: PaymentDetails = {
  type: "card",
  cardNumber: "4111111111118821",
  cardHolder: "John Doe",
  cvv: "123"
};

console.log("[Процесинг платежу]");
if (isCreditCardPayment(cardPayment)) {
  console.log(`Метод оплати: ${cardPayment.type}`);
  console.log(`Маскування: ${maskCardNumber(cardPayment)}`);
}
console.log(`Результат: ${processPayment(cardPayment, totalOrderPrice)}`);
console.log("");

const cashPayment: PaymentDetails = {
  type: "cash",
  cashAmountToPay: 50000
};

console.log("[Оплата готівкою]");
console.log(`Результат: ${processPayment(cashPayment, totalOrderPrice)}`);
console.log("");

const onlinePayment: PaymentDetails = {
  type: "online_service",
  serviceName: "GooglePay",
  transactionRef: "TXN-2026-001"
};

console.log("[Онлайн-оплата]");
console.log(`Результат: ${processPayment(onlinePayment, totalOrderPrice)}`);