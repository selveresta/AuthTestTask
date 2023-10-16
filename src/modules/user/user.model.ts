import { Schema, model } from 'mongoose';
import { Roles } from '../../sharedModels';

export interface IUser {
    email: string;
    password: string;
    role: Roles;
    boss: Schema.Types.ObjectId;
}

export const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    boss: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    role: { type: String, enum: Roles },
});

const User = model<IUser>('User', UserSchema);

export default User;
