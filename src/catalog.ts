import type { Product } from "./types.js";

export function createProduct(productData: Product): Product {
  if (productData.price < 0) {
    throw new Error("Ціна не може бути від'ємною");
  }

  if (productData.warrantyMonths < 0) {
    throw new Error("Гарантія не може бути від'ємною");
  }

  if (
    productData.powerWatts !== undefined &&
    productData.powerWatts < 0
  ) {
    throw new Error("Потужність не може бути від'ємною");
  }

  if (productData.specs[1] < 0) {
    throw new Error("Обсяг RAM не може бути від'ємним");
  }

  return {
    ...productData,
    tags: [...productData.tags],
    specs: [...productData.specs]
  };
}

export function calculateLineTotal(
  price: number,
  quantity: number,
  discountPercent: number = 0
): number {
  if (price < 0) {
    throw new Error("Ціна не може бути від'ємною");
  }

  if (quantity < 0) {
    throw new Error("Кількість не може бути від'ємною");
  }

  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Знижка повинна бути від 0 до 100%");
  }

  const total = price * quantity;
  const discount = total * (discountPercent / 100);

  return total - discount;
}