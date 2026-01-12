import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class RefreshToken extends Model<RefreshToken>{
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    token: string;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    expiresAt: Date;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    userId: number;

    // Relationships
    @BelongsTo(() => User)
    user: User;
}    