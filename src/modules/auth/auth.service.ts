import { BadRequestException, Injectable } from '@nestjs/common';
import { USER_EXIST, USER_NOT_EXIST } from '../../common/errors-constants/users.error';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { AUTH_WRONG_DATA } from 'src/common/errors-constants/auth-user.error';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response/auth-user.response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService
    ) { }

    async register(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.usersService.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(USER_EXIST);
        return this.usersService.createUser(dto);
    }

    async login(dto: LoginUserDTO): Promise<AuthUserResponse> {
        const existUser = await this.usersService.findUserByEmail(dto.email);
        if (!existUser) throw new BadRequestException(USER_NOT_EXIST)
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(AUTH_WRONG_DATA)
        const userData = {
            name: existUser.userName,
            email: existUser.email
        }
        const token = await this.tokenService.generateJwtToken(userData)
        const user = await this.usersService.publicUser(dto.email)
        return {...user, token}
    }
}
