import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GetUser } from './decorator';
import { Request } from 'express';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }


  @Post('refresh')
  async refreshToken(@Req() req, @Body() body) {
    const userId = body.id;
    return this.authService.refreshTokens(userId, body.refreshToken);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  Logout(@Body() log: {userId:any} ){
    console.log(log)
    const id = parseInt(log.userId)
    return this.authService.logout(id)
  }
}
