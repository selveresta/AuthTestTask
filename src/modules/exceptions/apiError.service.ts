export class ApiError extends Error {
    status;
    errors;

    constructor(_status, message, _errors = []) {
        super(message);
        this.status = _status;
        this.errors = _errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
