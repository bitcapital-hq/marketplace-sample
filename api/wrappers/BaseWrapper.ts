import { LoggerInstance, ServiceDescription } from "ts-framework-common";

export default abstract class BaseWrapper<T> {
  abstract wrap(arg: T);
}
