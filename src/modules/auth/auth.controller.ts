import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Post('user/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
