import type {
  CreditCardPayment,
  PaymentDetails
} from "./types.js";

export function isCreditCardPayment(
  payment: PaymentDetails
): payment is CreditCardPayment {
  return payment.type === "card";
}

export function maskCardNumber(payment: PaymentDetails): string {
  if (!isCreditCardPayment(payment)) {
    return "Не вимагає маскування";
  }

  const digits = payment.cardNumber.replace(/\D/g, "");

  if (digits.length < 4) {
    throw new Error("Номер картки занадто короткий");
  }

  const lastFour = digits.slice(-4);

  return `**** **** **** ${lastFour}`;
}

export function processPayment(
  payment: PaymentDetails,
  amount: number
): string {
  if (amount < 0) {
    throw new Error("Сума платежу не може бути від'ємною");
  }

  switch (payment.type) {
    case "card":
      return `Успішно списано ${amount} грн з картки платника ${payment.cardHolder}.`;

    case "cash":
      if (payment.cashAmountToPay < amount) {
        throw new Error("Недостатньо готівки для оплати");
      }

      if (payment.cashAmountToPay > amount) {
        const change = payment.cashAmountToPay - amount;

        return `Підготувати решту: ${change} грн.`;
      }

      return `Оплата готівкою при отриманні: ${amount} грн.`;

    case "online_service":
      return `Успішна авторизація ${amount} грн через ${payment.serviceName}. Transaction: ${payment.transactionRef}`;

    default: {
      const _exhaustiveCheck: never = payment;

      throw new Error(
        `Невідомий спосіб оплати: ${_exhaustiveCheck}`
      );
    }
  }
}