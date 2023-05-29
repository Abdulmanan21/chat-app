import { message } from "src/database/entities/message.entity";

export const messageProvider=[{
    provide:'messageRepo',useValue:message
}]