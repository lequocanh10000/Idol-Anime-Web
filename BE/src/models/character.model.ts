import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IdolGroup } from "./idol-group.model";

@Table
export class Character extends Model<Character> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    seiyuu: string;

    @Column({
        type: DataType.STRING,
    })
    role: string;

    @Column({
        type: DataType.STRING,
    })
    imageUrl: string;

    @ForeignKey(() => IdolGroup)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idolGroupId: number;

    // Relationships
    @BelongsTo(() => IdolGroup)
    idolGroup: IdolGroup;
}