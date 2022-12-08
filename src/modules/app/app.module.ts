import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configs } from '../../configs/index'
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';

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
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                database: configService.get('db_name'),
                synchronize: true,
                models: []
            })
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
