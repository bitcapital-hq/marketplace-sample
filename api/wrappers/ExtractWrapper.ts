import BaseWrapper from "./BaseWrapper";
import Extract from "../models/Extract";

export default class ExtractWrapper extends BaseWrapper<Extract> {
  protected static instance: ExtractWrapper;

  public wrap(extract: Extract) {
    return {
      buyer: {
        id: extract.customer.id,
        name: extract.customer.name
      },
      seller: {
        id: extract.seller.id,
        name: extract.seller.name
      },
      quantity: extract.quantity,
      totalPrice: extract.totalValue
    };
  }

  public static getInstance() {
    if (!this.instance) {
      return this.initialize();
    }
    return this.instance;
  }

  public static initialize() {
    const wrapper = new ExtractWrapper();
    if (!this.instance) {
      this.instance = wrapper;
    }
    return wrapper;
  }
}
