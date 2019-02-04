import BaseWrapper from "./BaseWrapper";
import User from "../models/User";

export default class UserWrapper extends BaseWrapper<User> {
  protected static instance: UserWrapper;

  public wrap(user: User) {
    return {
      id: user.id,
      name: user.name,
      bitcapitalId: user.bitcapitalId,
      walletId: user.bitcapitalWalletId,
      documentId: user.bitcapitalDocumentId,
      document: user.document,
      email: user.email
    };
  }

  public static getInstance() {
    if (!this.instance) {
      return this.initialize();
    }
    return this.instance;
  }

  public static initialize() {
    const wrapper = new UserWrapper();
    if (!this.instance) {
      this.instance = wrapper;
    }
    return wrapper;
  }
}
