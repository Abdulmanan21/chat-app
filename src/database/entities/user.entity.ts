import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Members } from './members.entity';
import { message } from './message.entity';
import { conversation } from './conversation.entity';

export interface UserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  email?: string;
  password?: string;
}

@Table({
  tableName: 'user',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
})
export class User
  extends Model<UserAttributes, UserAttributes>
  implements UserAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({
    name: 'PRIMARY',
    using: 'BTREE',
    order: 'ASC',
    unique: true,
  })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(45),
  })
  firstName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(45),
  })
  lastName?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  createdAt?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  email?: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password?: string;

  @BelongsToMany(() => conversation, () => Members)
  conversations: conversation[];

  @HasMany(() => Members)
  members: Members[];

  @HasMany(() => message, 'senderId')
  sendermessages: message[];

  @HasMany(() => message, 'recieverId')
  recievermessages: message[];
}
