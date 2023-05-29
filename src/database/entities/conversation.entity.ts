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
import { User } from './user.entity';

export interface conversationAttributes {
  id?: number;
  name?: string;
  createdAt?: Date;
}

@Table({
  tableName: 'conversation',
  timestamps: true,
  updatedAt: false,
})
export class conversation
  extends Model<conversationAttributes, conversationAttributes>
  implements conversationAttributes
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
    type: DataType.STRING(100),
  })
  name?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  createdAt?: Date;

  @BelongsToMany(() => User, () => Members)
  users: User[];

  @HasMany(() => Members)
  members: Members[];

  @HasMany(() => Members)
  membersFiltering: Members[];

  @HasMany(() => message, 'conversationId')
  sendermessages: message[];
}
