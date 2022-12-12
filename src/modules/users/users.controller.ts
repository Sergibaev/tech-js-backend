import {
    Body,
    Controller,
    Delete,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiTags('Users')
    @ApiResponse({ status: 200, type: UpdateUserDTO })
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUser(
        @Body() dto: UpdateUserDTO,
        @Req() request,
    ): Promise<UpdateUserDTO> {
        const user = request.user;
        return this.usersService.updateUser(user.email, dto);
    }

    @ApiTags('Users')
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Req() request) {
        const user = request.user
        return this.usersService.deleteUser(user.email);
    }
}
