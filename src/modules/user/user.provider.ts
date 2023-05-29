import { User } from "src/database/entities/user.entity";

export const userProvider=[{
    provide:'userrepo',useValue:User
}]