import User from './user.model';
import * as bcrypt from 'bcrypt';

import { Roles } from '../../sharedModels';
import { TokenService } from '../token/token.service';
import { UserDto } from './dtos/user-dto';
import { Schema } from 'mongoose';
import { ApiError } from '../exceptions/apiError.service';
export class UserService {
    static userServiceInstance: UserService;

    private adminID: Schema.Types.ObjectId;

    private constructor() {}

    public static getInstance(): UserService {
        if (!UserService.userServiceInstance) {
            this.userServiceInstance = new UserService();
        }

        return UserService.userServiceInstance;
    }

    async registration(email: string, password: string) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User with ${email} email is already registered`);
        }
        const hashPassword = await bcrypt.hash(password, 3);

        const user = await User.create({ email, password: hashPassword, role: Roles.RegularUser, boss: this.adminID });

        const tokenService = TokenService.getInstance();
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async createAdmin() {
        const candidate = await User.findOne({ email: 'admin@mail.com' });
        if (candidate) {
            this.adminID = candidate.id;
            return;
        }
        const hashPassword = await bcrypt.hash('admin', 3);

        const admin = await User.create({ email: 'admin@mail.com', password: hashPassword, role: Roles.Admin, boss: null });
        this.adminID = admin.id;
    }

    async login(email, password) {
        const tokenService = TokenService.getInstance();

        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Unccorect password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const tokenService = TokenService.getInstance();
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const tokenService = TokenService.getInstance();
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        //@ts-ignore
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async getUsersByRole(refreshToken: string) {
        const tokenService = TokenService.getInstance();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log(userData);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        //@ts-ignore
        const role = userData.role;
        if (role === Roles.Admin) {
            return await this.getAllUsers();
        }

        if (role === Roles.Boss) {
            //@ts-ignore
            const boss = await User.find({ email: userData.email });
            const usersBoss = await this.getRecursiveUsers(boss[0]);
            console.log(usersBoss);
            return {
                boss: boss,
                users: usersBoss,
            };
        }

        if (role === Roles.RegularUser) {
            //@ts-ignore
            return User.find({ email: userData.email });
        }
    }

    private async getRecursiveUsers(startBoss) {
        const resUsers = [];
        const usersBoss = await User.find({ boss: startBoss._id });
        console.log(usersBoss);
        if (!usersBoss) {
            return;
        }
        while (usersBoss.length !== 0) {
            const user = usersBoss.shift();

            resUsers.push(user);
            if (user.role === Roles.Boss) {
                const recurciveUsers = await this.getRecursiveUsers(user);
                const userMail = user.email;
                if (recurciveUsers.length !== 0) {
                    resUsers.push({ [`${userMail}`]: recurciveUsers });
                }
            }
        }

        return resUsers;
    }

    async changeBoss(email, bossEmailFrom, bossEmailTo) {
        const candidate = await User.findOne({ email: email });
        const bossFrom = await User.findOne({ email: bossEmailFrom });
        const bossTo = await User.findOne({ email: bossEmailTo });

        if (!candidate || bossFrom.id !== String(candidate.boss) || candidate.role === Roles.Admin || bossEmailFrom === bossEmailTo) {
            throw ApiError.BadRequest('Uncorrect data');
        }

        candidate.boss = bossTo.id;
        const newUser = await candidate.save();

        const usersOfBossFrom = await User.find({ boss: bossFrom.id });
        console.log(usersOfBossFrom);

        if (usersOfBossFrom.length === 0 && bossFrom.role !== Roles.Admin) {
            bossFrom.role = Roles.RegularUser;
            const a = await bossFrom.save();
            console.log(a);
        }

        const usersOfBossTo = await User.find({ boss: bossTo.id });

        if (usersOfBossTo.length !== 0 && bossTo.role === Roles.RegularUser) {
            bossTo.role = Roles.Boss;
            await bossTo.save();
        }

        return {
            newUser,
            bossFrom,
            bossTo,
        };
    }
}
