import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TitleModule } from './title/title.module';
import { MedalModule } from './medal/medal.module';

@Module({
  imports: [UserModule, TitleModule, MedalModule],
})
export class AppModule {}
