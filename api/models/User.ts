import {Column,  Entity} from 'typeorm';
import BaseModel from './BaseModel';
import { IsEmail, IsNumberString, IsEnum } from 'class-validator';
import { BaseModelSchema } from './BaseModel';
import { UserStatus } from 'bitcapital-core-sdk';

export interface UserSchema extends BaseModelSchema {
  name: string;
  email: string;
  document: string;
  status: string;
  telephoneCountryCode: string;
  telephoneRegionalCode: string;
  telephoneNumber: string;
  residenceNumber: string;
  residenceZipcode: string;
  residenceInformation: string;
  residenceReference: string;
  accountAgencyNumber?: string;
  accountBankNumber?: string;
  accountNumber?: string;
}

@Entity(User.tableName)
export default class User extends BaseModel implements UserSchema {
  private static readonly tableName = 'user';

  @Column({ nullable: false })
  public name: string = undefined;

  @IsEmail()
  @Column({ nullable: false, unique: true })
  public email: string = undefined;

  @Column({ nullable: false })
  public document: string = undefined;

  @Column({ nullable: false })
  @IsEnum(UserStatus)
  public status: string = undefined;

  @Column({ nullable: false })
  @IsNumberString()
  public telephoneCountryCode: string = undefined;

  @Column({ nullable: false })
  @IsNumberString()
  public telephoneRegionalCode: string = undefined;

  @Column({ nullable: false })
  @IsNumberString()
  public telephoneNumber: string = undefined;

  @Column({ nullable: false })
  @IsNumberString()
  public residenceNumber: string = undefined;

  @Column({ nullable: false })
  public residenceZipcode: string = undefined;

  @Column({ nullable: false })
  public residenceInformation: string = undefined;

  @Column({ nullable: false })
  public residenceReference: string = undefined;

  @Column()
  @IsNumberString()
  public accountAgencyNumber?: string = undefined;
  
  @Column()
  @IsNumberString()
  public accountBankNumber?: string = undefined;

  @Column()
  @IsNumberString()
  public accountNumber?: string = undefined;

  public constructor(data: Partial<UserSchema>) {
    super(data);
  }

  /**
   * Finds user based on its name.
   */ 
  public static async findByName(name: string): Promise<User | undefined> {
    return this.findOne({ where: {name} });
  }

  public static async findById(id: string): Promise<User | undefined> {
    return this.findOne(id);
  }
}
