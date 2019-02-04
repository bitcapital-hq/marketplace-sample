import BaseWrapper from "./BaseWrapper";
import { Payment } from "bitcapital-core-sdk";

export default class PaymentWrapper extends BaseWrapper<Payment> {
  protected static instance: PaymentWrapper;

  public wrap(extract: Payment) {
    return {
      id: extract.id,
      totalAmount: extract.totalAmount,
      sourceWallet: {
        id: extract.transaction.source.id,
        publicKey: extract.transaction.source.data,
        provider: extract.transaction.source.user
      },
      type: extract.transaction.type,
      status: extract.transaction.type
    };
  }

  public static getInstance() {
    if (!this.instance) {
      return this.initialize();
    }
    return this.instance;
  }

  public static initialize() {
    const wrapper = new PaymentWrapper();
    if (!this.instance) {
      this.instance = wrapper;
    }
    return wrapper;
  }
}
