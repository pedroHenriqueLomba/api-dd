// src/services/character.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../schemas/character.schema';
import { CharacterDTO } from '../dto/character.dto';
import { ApiService } from './api.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    private readonly apiService: ApiService,
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
    const race = await this.apiService.getRaceByIndex(raceIndex);
    const characterClass = await this.apiService.getClassByIndex(classIndex);

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
