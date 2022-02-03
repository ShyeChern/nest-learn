import { forwardRef, Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CatsModule } from 'src/cats/cats.module';

// @Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => CatsModule)],
})
export class UsersModule {}
