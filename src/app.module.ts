import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './modules/character/schemas/character.schema';
import { CharacterModule } from './modules/character/character.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'), 
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    CharacterModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
