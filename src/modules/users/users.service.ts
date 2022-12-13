import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { WatchlistModel } from '../watchlist/models/watchlist.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly usersRepository: typeof UserModel) {}

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10);
        } catch (e) {
            throw new Error(e)
        }
    }

    async findUserByEmail(email: string): Promise<UserModel> {
        try {
            return this.usersRepository.findOne({ where: { email } });
        } catch (e) {
            throw new Error(e)
        }
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashPassword(dto.password);
            return this.usersRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password,
        });
        } catch (e) {
            throw new Error(e)
        }
    }

    async publicUser(email: string): Promise<UserModel> {
        try {
            return this.usersRepository.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: {
                    model: WatchlistModel,
                    required: false,
                }
            });
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.usersRepository.update(dto, { where: { email } });
            return dto;
        } catch (e) {
            throw new Error(e)
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            await this.usersRepository.destroy({ where: { email } })
            return true
        } catch (e) {
            throw new Error(e)
        }
    }
}
