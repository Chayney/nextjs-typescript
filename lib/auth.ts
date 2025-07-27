import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}

export function setAuthCookie(res: any, token: string) {
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
    }));
}
