import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { CatsController } from './cats.controller';
import { Cat } from './cats.model';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  imports: [forwardRef(() => UsersModule), SequelizeModule.forFeature([Cat])],
})
export class CatsModule {}
