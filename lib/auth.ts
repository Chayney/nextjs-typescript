import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { ServerResponse } from 'http';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

type TokenPayload = {
    userId: string;
};

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, SECRET) as TokenPayload;
}

export function setAuthCookie(res: ServerResponse, token: string) {
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
    }));
}
