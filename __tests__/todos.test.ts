import { signToken, verifyToken } from '../lib/auth';

describe('JWT Auth Utils', () => {
    const payload = { userId: 1 };

    it('should sign and verify a token', () => {
        const token = signToken(payload);
        expect(typeof token).toBe('string');

        const decoded = verifyToken(token) as any;
        expect(decoded.userId).toBe(1);
    });

    it('should throw error for invalid token', () => {
        expect(() => verifyToken('invalid-token')).toThrow();
    });
});
