import { EntityDatabase } from "ts-framework-sql";
import * as Config from "../config";
import * as Models from "./models";

export default class MainDatabase extends EntityDatabase {
  public static readonly ENTITIES = [
    Models.User
  ];

  protected static readonly instance: MainDatabase = new MainDatabase({
    connectionOpts: {
      ...Config.database,
      entities: MainDatabase.ENTITIES
    }
  } as any);

  /**
   * Gets the singleton database instance.
   */
  static getInstance(): any {
    return this.instance;
  }
}