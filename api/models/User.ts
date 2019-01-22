import { BaseEntity, Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(User.tableName)
export default class User extends BaseEntity {
  private static readonly tableName = 'users';

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  public constructor(data: DeepPartial<User> = {}) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  /**
   * Finds user based on its name.
   */ 
  public static async findByName(name: string): Promise<User | undefined> {
    return this.findOne({ where: {name} });
  }
}
