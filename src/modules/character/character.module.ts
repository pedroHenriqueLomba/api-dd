import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { ApiDdHelper } from 'src/helpers/api-dd.helper';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    HttpModule,
    AuthModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService, ApiDdHelper],
})
export class CharacterModule {}
