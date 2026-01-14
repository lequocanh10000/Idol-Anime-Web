import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany, BeforeValidate } from "sequelize-typescript";
import { Role } from "./role.model";
import * as bcrypt from 'bcryptjs'

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

    // Methods
    comparePassword(password: string) {
        const {password: passwordInDb} = this.get( {plain: true})
        return bcrypt.compare(password, passwordInDb);
    }

    getUserWithoutPassword() {
        const {password: _, ...rest } = this.get( {plain: true});
        return rest
    }

    @BeforeValidate
    static hashPassword(user: User) {
        if(user.isNewRecord) {
            const password = user.get('password');
            const hashedPassword = bcrypt.hashSync(password, 10);
            user.setDataValue('password', hashedPassword);
        }
    }
}