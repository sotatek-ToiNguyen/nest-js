import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post, Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { USER_ROLE } from '@utils/Const'
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('user/login')
    async login(@Body() payload: LoginDto): Promise<any> {
        const userType = USER_ROLE.ICO_OWNER;
        const user = await this.authService.validateUser(payload, userType);
    }
}
