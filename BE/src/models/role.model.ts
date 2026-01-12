import { Column, Table, DataType, Model, HasMany  } from "sequelize-typescript";
import { User } from "./user.model";

export enum RoleName {
    ADMIN = "Admin",
    USER = "User"
}

@Table
export class Role extends Model<Role> {
   @Column({
    unique: true,
    allowNull: false,
    type:  DataType.ENUM(...Object.values(RoleName)),
   })
   name: RoleName;

   // Relationships
   @HasMany(() => User)
    users: User[];
}