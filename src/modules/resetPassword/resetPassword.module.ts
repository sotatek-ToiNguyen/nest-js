import { MiddlewareConsumer, Module} from '@nestjs/common';
import { UsersService } from '@modules/user/users.service';
import { UsersController } from '@modules/user/users.controller';
import { WhitelistUserModule } from '@modules/whitelistUser/whitelistUser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { ResetPasswordService } from '@modules/resetPassword/resetPassword.service';
import { PrefixMiddleware } from '../../common/middleware/prefix.middleware';
import { SignatureMiddleware } from '../../common/middleware/signature.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), WhitelistUserModule, ResetPasswordService],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(PrefixMiddleware)
        .forRoutes(UsersController);
    consumer
        .apply(SignatureMiddleware)
        .forRoutes('/**/forgot-password');
  }
}
