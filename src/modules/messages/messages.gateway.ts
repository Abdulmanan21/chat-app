import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../Auth/auth.service';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  private logger: Logger = new Logger('MessageGateway');
  private userconnected = [];
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Socket Gateway Initialized');
  }

  async handleConnection(client: Socket, ...args: []) {
    const token: string = client.handshake.query.token.toString();

    const payload: any = await this.authService.verifytoken(
      client.handshake.query.token.toString(),
    );
    console.log(
      '🚀 ~ file: messages.gateway.ts:39 ~ handleConnection ~ payload:',
      payload,
    );

    const clientId = { id: payload.id, clientId: client.id };

    this.logger.log('connected');
    this.userconnected.push(clientId);

    this.logger.log(`Socket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.userconnected = this.userconnected.filter(function (
      value,
      index,
      arr,
    ) {
      return !client.id == value;
    });

    this.logger.log(`Socket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() payload: any): Promise<void> {
    var sender = this.userconnected.filter((obj) => {
      return obj.id == payload.senderId;
    });

    var recievers = [];
    if (Array.isArray(payload.recieverId) && payload.recieverId.length > 1) {
      payload.recieverId.map((id: any) => {
        const recievers1 = this.userconnected.filter((obj) => {
          return obj.id == id.id;
        });

        if (recievers1.length > 0) {
          if (payload.senderId == recievers1[0].id) {
          } else {
            recievers.push(recievers1[0]);
          }
        }
      });
    } else {
      var reciever1 = this.userconnected.filter((obj) => {
        return obj.id == payload.recieverId;
      });
      recievers.push(reciever1[0]);
    }

    if (sender.length > 0) {
      console.log(recievers);
      recievers.map((reciever) => {
        this.server
          .to(reciever.clientId)
          .emit('receiveMessage', payload.message);
      });
    }
  }

  @SubscribeMessage('receiveMessage')
  async handlerecieveMessage(@MessageBody() payload): Promise<void> {
    console.log('reviajklsdfjklasjdfkldjalskdfjkasljlasdkjfklasj;-----------l');
    console.log('------------', payload);
  }
}
