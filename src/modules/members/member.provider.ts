import { Members } from "src/database/entities/members.entity";

export const memberprovider=[{
    provide:'memberrepo',useValue:Members
}]