export type EntityId = string | number;

export interface BaseProduct {
  readonly id: EntityId;
  title: string;
  price: number;
  description?: string;
  tags: string[];
  inStock: boolean;
}

export interface Product extends BaseProduct {
  warrantyMonths: number;
  powerWatts?: number;
  specs: [cpu: string, ramGb: number];
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type DeliveryMethod =
  | "courier"
  | "post_locker"
  | "store_pickup";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TimestampMetadata = {
  readonly createdAt: Date;
  updatedAt: Date;
};

export type Order = TimestampMetadata & {
  readonly orderId: string;
  customerEmail: string;
  items: CartItem[];
  status: OrderStatus;
  delivery: DeliveryMethod;
};

export interface CreditCardPayment {
  type: "card";
  cardNumber: string;
  cardHolder: string;
  cvv: string;
}

export interface CashOnDeliveryPayment {
  type: "cash";
  cashAmountToPay: number;
}

export interface OnlineServicePayment {
  type: "online_service";
  serviceName: "ApplePay" | "GooglePay";
  transactionRef: string;
}

export type PaymentDetails =
  | CreditCardPayment
  | CashOnDeliveryPayment
  | OnlineServicePayment;