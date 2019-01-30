import { validate, ValidationError, ValidatorOptions } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface BaseModelSchema {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default abstract class BaseModel extends BaseEntity implements BaseModelSchema {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  constructor(data: Partial<BaseModelSchema> = {}) {
    super();
    Object.assign(this, data);
  }

  async validate(validatorOptions?: ValidatorOptions): Promise<ValidationError[]> {
    return validate(this, { forbidUnknownValues: false, ...validatorOptions });
  }
}
