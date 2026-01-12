import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany } from "sequelize-typescript";
import { Role } from "./role.model";
import { RefreshToken } from "./refresh-token.model";

@Table
export class User extends Model<User>{
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    username: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 2, // Default role USER
    })
    roleId: number;
    
    // Relationships
    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => RefreshToken)
    refreshTokens: RefreshToken[];
}