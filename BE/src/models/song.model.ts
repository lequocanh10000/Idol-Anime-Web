import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Anime } from "./anime.model";

export enum SongType {
    OPENING = 'OP',
    ENDING = 'ED',
    INSERT = 'Insert',
    OTHERS = 'Khác'
}
@Table
export class Song extends Model<Song> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.STRING,
    })
    artist: string;

    @Column({
        type: DataType.ENUM(...Object.values(SongType)),
        defaultValue: SongType.OTHERS,
    })
    songType: SongType;

    @Column({
        type: DataType.STRING,
    })
    youtubeUrl: string;

    @ForeignKey(() => Anime)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    animeId: number;

    // Relationships
    @BelongsTo(() => Anime)
    anime: Anime;
}