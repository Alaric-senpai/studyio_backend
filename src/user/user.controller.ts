import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get('me')
    getMe(@GetUser() user ){
        console.log('controller invoked')
        return  {
            user
        }
    }

    @Patch('disable')
    Deactivate( ){

    }
}
