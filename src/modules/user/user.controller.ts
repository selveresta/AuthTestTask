import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { validationResult } from 'express-validator/';
import { ApiError } from '../exceptions/apiError.service';

export class UserController {
    constructor() {
        const userService = UserService.getInstance();
        userService.createAdmin();
    }

    async registration(req: Request, res: Response, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()));
            }
            const userService = UserService.getInstance();
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const userService = UserService.getInstance();

            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const userService = UserService.getInstance();

            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const userService = UserService.getInstance();

            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const userService = UserService.getInstance();
            const { refreshToken } = req.cookies;
            const users = await userService.getUsersByRole(refreshToken);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async changeBoss(req, res, next) {
        try {
            const userService = UserService.getInstance();
            const { email, bossEmailFrom, bossEmailTo } = req.body;
            const user = await userService.changeBoss(email, bossEmailFrom, bossEmailTo);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
