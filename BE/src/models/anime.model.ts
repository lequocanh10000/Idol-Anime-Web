import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { IdolGroup } from "./idol-group.model";
import { Song } from "./song.model";

export enum IdolType {
    SCHOOL = "School",
    PROFESSIONAL = "Professional",
    VIRTUAL = "Virtual",
    BAND = "Band",
    OTHERS = "Khác"
}

export enum AnimationFormat {
    TV = "TV",
    MOVIE = "Movie",
    OVA = "OVA",
    ONA = "ONA",
}

@Table
export class Anime extends Model<Anime> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.ENUM(...Object.values(IdolType)),
        defaultValue: IdolType.OTHERS,
    })
    idolType: IdolType;

    @Column({
        type: DataType.ENUM(...Object.values(AnimationFormat)),
        defaultValue: AnimationFormat.TV,
    })
    animationFormat: AnimationFormat;   

    @Column({
        type: DataType.STRING,
    })
    franchise: string;

    @Column({
        type: DataType.STRING,
    })
    studio: string;

    @Column({
        type: DataType.INTEGER,
    })
    releaseYear: number;

    @Column({
        type: DataType.STRING,
    })
    posterUrl: string;

    @Column({
        type: DataType.TEXT,
    })
    description: string;

    // Relationships
    @HasMany(() => IdolGroup)
    idolGroups: IdolGroup[];

    @HasMany(() => Song)
    songs: Song[];
}