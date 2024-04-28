import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TitleModule } from './title/title.module';

@Module({
  imports: [UserModule, TitleModule],
})
export class AppModule {}
