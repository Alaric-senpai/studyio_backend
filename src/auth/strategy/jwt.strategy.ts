import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly config: ConfigService,
        private readonly prisma: PrismaService
    ) {
        const secret = config.get<string>('HASH_KEY');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,  // Now guaranteed to be a string
        });
    }

    async validate(payload: any) {
        return await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: {
                email: true,
                id: true,
                createdAt: true,
                updatedAt: true,
                name: true,
                role:true
            },
        });
    }
}
