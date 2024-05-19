const {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
} = require('./expressError');

describe('Express Error Classes', () => {
    describe('ExpressError', () => {
        test('should create an instance of ExpressError with message and status', () => {
            const error = new ExpressError('Test error message', 500);
            expect(error.message).toBe('Test error message');
            expect(error.status).toBe(500);
        });
    });

    describe('NotFoundError', () => {
        test('should create an instance of NotFoundError with default message and status 404', () => {
            const error = new NotFoundError();
            expect(error.message).toBe('Not Found');
            expect(error.status).toBe(404);
        });

        test('should create an instance of NotFoundError with custom message and status 404', () => {
            const error = new NotFoundError('Custom not found message');
            expect(error.message).toBe('Custom not found message');
            expect(error.status).toBe(404);
        });
    });

    describe('UnauthorizedError', () => {
        test('should create an instance of UnauthorizedError with default message and status 401', () => {
            const error = new UnauthorizedError();
            expect(error.message).toBe('Unauthorized');
            expect(error.status).toBe(401);
        });

        test('should create an instance of UnauthorizedError with custom message and status 401', () => {
            const error = new UnauthorizedError('Custom unauthorized message');
            expect(error.message).toBe('Custom unauthorized message');
            expect(error.status).toBe(401);
        });
    });

    describe('BadRequestError', () => {
        test('should create an instance of BadRequestError with default message and status 400', () => {
            const error = new BadRequestError();
            expect(error.message).toBe('Bad Request');
            expect(error.status).toBe(400);
        });

        test('should create an instance of BadRequestError with custom message and status 400', () => {
            const error = new BadRequestError('Custom bad request message');
            expect(error.message).toBe('Custom bad request message');
            expect(error.status).toBe(400);
        });
    });

    describe('ForbiddenError', () => {
        test('should create an instance of ForbiddenError with default message and status 403', () => {
            const error = new ForbiddenError();
            expect(error.message).toBe('Bad Request');
            expect(error.status).toBe(403);
        });

        test('should create an instance of ForbiddenError with custom message and status 403', () => {
            const error = new ForbiddenError('Custom forbidden message');
            expect(error.message).toBe('Custom forbidden message');
            expect(error.status).toBe(403);
        });
    });
});
