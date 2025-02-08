import fs from 'fs';
import path from 'path';
import { JwtPayload, sign } from 'jsonwebtoken';
import Config from '../config/config';
import { User } from '../entity/User';
import { RefreshToken } from '../entity/RefreshToken';
import { Repository } from 'typeorm';

export class TokenService {
    constructor(private refreshTokenRepository: Repository<RefreshToken>) {}
    generateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer;
        try {
            privateKey = fs.readFileSync(path.join(__dirname, '../../certs/private.pem'));
        } catch (error) {
            throw error;
        }

        //Access Token
        const accessToken = sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1h',
            issuer: 'user-register'
        });
        return accessToken;
    }

    generateRefreshToken(payload: JwtPayload) {
        const refreshToken = sign(payload, Config.SECRETE_KEY!, {
            algorithm: 'HS256',
            expiresIn: '1y',
            issuer: 'auth-service',
            jwtid: String(payload.id)
        });
        return refreshToken;
    }

    async persistRefreshToken(user: User) {
        const MS_IN_YEAR =
            1000 *
            60 *
            60 *
            24 *
            ((new Date().getFullYear() % 4 === 0 && new Date().getFullYear() % 100 !== 0) || new Date().getFullYear() % 400 === 0 ? 366 : 365);
        const newRefreshToken = await this.refreshTokenRepository.save({
            user: user,
            expireAt: new Date(Date.now() + MS_IN_YEAR)
        });
        return newRefreshToken;
    }
}

