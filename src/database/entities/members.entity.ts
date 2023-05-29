import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { conversation } from './conversation.entity';

export interface MembersAttributes {
  id?: number;
  userId?: number;
  conversationId?: number;
}

@Table({
  tableName: 'Members',
  timestamps: true,
  paranoid: true,
})
export class Members
  extends Model<MembersAttributes, MembersAttributes>
  implements MembersAttributes
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

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  userId?: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => conversation)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  conversationId?: number;
  @BelongsTo(() => conversation)
  conversation: conversation;
}
