import { conversation } from "src/database/entities/conversation.entity";

export const chatProvider=[{
    provide:'conversation', useValue:conversation
}]