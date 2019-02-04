import { Job, JobOptions } from "ts-framework-common";
import MainServer from "../server";
import { Product } from "../models";

export interface CreateProductJobOptions extends JobOptions {}

export default class CreateProductJob extends Job {
  constructor(public options: CreateProductJobOptions = {}) {
    super(options);
  }

  // this is SUPER CODING
  private getRandomString() {
    let text = "";
    let i: number = 0;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public async run(server: MainServer): Promise<void> {
    this.logger.info("Starting create product job");

    const product: Product = await Product.create({
      name: this.getRandomString(),
      description: this.getRandomString(),
      imageUrl: this.getRandomString()
    });

    product.validate();
    product.save();
    this.logger.info("Finished create product job");
  }
}
