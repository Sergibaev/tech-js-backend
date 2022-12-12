import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel)
        private readonly usersRepository: typeof UserModel,
    ) {}

    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    async findUserByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        dto.password = await this.hashPassword(dto.password);
        return this.usersRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password,
        });
    }

    async publicUser(email: string) {
        return this.usersRepository.findOne({
            where: { email },
            attributes: { exclude: ['password'] },
        });
    }

    async updateUser(
        email: string,
        dto: UpdateUserDTO,
    ): Promise<UpdateUserDTO> {
        await this.usersRepository.update(dto, { where: { email } });
        return dto;
    }

    async deleteUser(email: string) {
        return this.usersRepository.destroy({ where: { email } });
    }
}
