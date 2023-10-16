import { Schema } from 'mongoose';
import { Roles } from '../../../sharedModels';

export class UserDto {
    email: string;
    id: Schema.Types.ObjectId;
    role: Roles;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
    }
}
