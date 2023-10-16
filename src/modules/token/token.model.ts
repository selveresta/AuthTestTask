import { Schema, model } from 'mongoose';
import { Roles } from '../../sharedModels';

export interface IToken {
    user: Schema.Types.ObjectId;
    refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
});

const Token = model<IToken>('Token', TokenSchema);

export default Token;
