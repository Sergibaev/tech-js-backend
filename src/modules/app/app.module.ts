import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configs } from '../../configs/app.configs'
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { UserModel } from '../users/models/user.model';
import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configs]
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                database: configService.get('db_name'),
                synchronize: true,
                autoLoadModels: true,
                models: [UserModel]
            })
        }),
        UsersModule,
        TokenModule,
        AuthModule
    ],
})
export class AppModule {}
