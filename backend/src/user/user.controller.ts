import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './use.service';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        const userId = req.user.id;  // Get user ID from validated JWT
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
