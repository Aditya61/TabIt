import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Generate JWT
export function generateToken(payload, rememberMe = false) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: rememberMe ? '30d' : '1h'
    });
}

// Verify JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch(err) {
        return null;
    }
}