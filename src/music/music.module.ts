import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { musicRepository } from './repositories/music.repository';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), S3Module],
  controllers: [MusicController],
  providers: [MusicService, musicRepository],
})
export class MusicModule {}
