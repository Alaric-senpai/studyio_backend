import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LogService } from '../log/log.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private logs:LogService) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email }
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatch = await argon.verify(user.hash, createAuthDto.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Password does not match');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);

    // Store hashed refresh token in DB
    await this.saveRefreshToken(user.id, tokens.refreshToken);


    // const logs  = await this.logs.

    return tokens
  }

  async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.HASH_KEY,
      expiresIn: '30m', // Access Token expires in 30 minutes
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_SECRET, // Different secret for refresh token
      expiresIn: '7d', // Refresh Token expires in 7 days
    });

    return { accessToken, refreshToken, userId };
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken }, // Store hashed refresh token
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    // Find the user by ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
  
    // Check if user exists and has a stored refresh token
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  
    // Verify the provided refresh token against the hashed token in the DB
    const isValid = await argon.verify(user.refreshToken, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  
    // Generate new access and refresh tokens
    const tokens = await this.generateTokens(user.id, user.email);
  
    // Store new hashed refresh token
    await this.saveRefreshToken(user.id, tokens.refreshToken);
  
    return tokens;
  }

  async logout(userId:number){
    return await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken: null
      }
    }) ? {success:true} : {success:false}
  }
  
}
