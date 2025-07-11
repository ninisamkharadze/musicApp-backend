import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Nini19.06.2012.samkharadze',
    database: 'musicapp',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
