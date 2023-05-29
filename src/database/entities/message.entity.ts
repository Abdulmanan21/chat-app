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

export interface messageAttributes {
  id?: number;
  message?: string;
  senderId?: number;
  recieverId?: number;
  conversationId?: number;
  createdAt?: Date;
}

@Table({
  tableName: 'message',
  timestamps: true,
})
export class message
  extends Model<messageAttributes, messageAttributes>
  implements messageAttributes
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
    type: DataType.STRING(),
  })
  message?: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  senderId?: number;
  @BelongsTo(() => User, 'senderId')
  sender: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  recieverId?: number;
  @BelongsTo(() => User, 'recieverId')
  reciever: User;

  @ForeignKey(() => conversation)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  conversationId?: number;
  @BelongsTo(() => conversation, 'conversationId')
  conversation: conversation;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  createdAt?: Date;
}
