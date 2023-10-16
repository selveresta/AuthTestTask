import * as jwt from 'jsonwebtoken';
import Token from './token.model';
import { Schema } from 'mongoose';
export class TokenService {
    static tokenServiceInstance: TokenService;

    private constructor() {}

    public static getInstance(): TokenService {
        if (!TokenService.tokenServiceInstance) {
            this.tokenServiceInstance = new TokenService();
        }

        return TokenService.tokenServiceInstance;
    }

    generateTokens(payload) {
        const accestoken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: '30m',
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: '30d',
        });

        return {
            accestoken,
            refreshToken,
        };
    }

    async saveToken(userID: Schema.Types.ObjectId, refreshToken) {
        const tokenData = await Token.findOne({ user: userID });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({ user: userID, refreshToken });
        return token;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token): {} {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken });
        return tokenData;
    }
}
