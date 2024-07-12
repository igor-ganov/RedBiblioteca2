import { UserRoles } from "./UserRoles";

export class User{
    id = '';
    userName = '';
    description = '';
    roles = UserRoles.NONE;
    password = '';
}

