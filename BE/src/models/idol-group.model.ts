import { DataType, Column, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { Anime } from "./anime.model";
import { Character } from "./character.model";

@Table
export class IdolGroup extends Model<IdolGroup> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @ForeignKey(() => Anime)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    animeId: number;

    // Relationships
    @BelongsTo(() => Anime)
    anime: Anime;

    @HasMany(() => Character)
    characters: Character[];
}