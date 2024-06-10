import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './controllers/character.controller';
import { CharacterService } from './services/character.service';
import { ApiService } from './services/api.service';
import { Character, CharacterSchema } from './schemas/character.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'), // Atualize a URI do MongoDB conforme necessário
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    HttpModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService, ApiService],
})
export class AppModule {}
