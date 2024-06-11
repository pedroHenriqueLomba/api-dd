import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { CharacterDTO } from 'src/dto/character.dto';
import { v4 as uuidv4 } from 'uuid';
import { ApiDdHelper } from 'src/helpers/api-dd.helper';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @Inject()
    private readonly apiDdHelper: ApiDdHelper,
  ) {}

  async getAllCharacters(): Promise<CharacterDTO[]> {
    return this.characterModel.find().exec();
  }

  async getCharacterById(id: string): Promise<CharacterDTO> {
    return this.characterModel.findOne({ id }).exec();
  }

  async createCharacter(
    name: string,
    raceIndex: string,
    classIndex: string,
  ): Promise<CharacterDTO> {
    const race = await this.apiDdHelper.getRaceByIndex(raceIndex);
    const characterClass = await this.apiDdHelper.getClassByIndex(classIndex);

    const newCharacter: CharacterDTO = {
      id: uuidv4(),
      name,
      race,
      class: characterClass,
    };

    const createdCharacter = new this.characterModel(newCharacter);
    return createdCharacter.save();
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.characterModel.deleteOne({ id }).exec();
  }
}
