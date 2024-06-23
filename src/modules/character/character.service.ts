import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { CharacterDTO } from 'src/dto/character.dto';
import { SpellDTO } from 'src/dto/spell.dto';
import { v4 as uuidv4 } from 'uuid';
import { ApiDdHelper } from 'src/helpers/api-dd.helper';
import { ItemDTO } from 'src/dto/item.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @Inject()
    private readonly apiDdHelper: ApiDdHelper,
    private readonly httpService: HttpService,
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
      level: 1,
      spells: [],  // Inicializando o array de spells vazio
      itens: [],  // Inicializando o array de itens vazio	
    };

    const createdCharacter = new this.characterModel(newCharacter);
    return createdCharacter.save();
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.characterModel.deleteOne({ id }).exec();
  }

  async addSpell(characterId: string, spellIndex: string): Promise<any> {
    const character = await this.characterModel.findOne({ id: characterId }).exec();

    if (!character) {
      throw new Error('Character not found');
    }

    const { class: charClass, level } = character;
    const spellsUrl = `https://www.dnd5eapi.co/api/spells?class=${charClass.index}&level=${level}`;

    const response = await this.httpService.get(spellsUrl).toPromise();
    const spells: SpellDTO[] = response.data.results;

    const spellToAdd = spells.find(spell => spell.index === spellIndex);

    if (!spellToAdd) {
       return 'You cant add this spell to your character.'
    }

    const spellExistsInCharacter = character.spells.some(spell => spell.index === spellIndex);

    if (!spellExistsInCharacter) {
      character.spells.push(spellToAdd);
      await character.save();
    }

    return character;
  }


 

async addItem(characterId: string, itemIndex: string): Promise<any> {
  const character = await this.characterModel.findOne({ id: characterId }).exec();

  if (!character) {
    throw new Error('Character not found');
  }

  const itemUrl = `https://www.dnd5eapi.co/api/equipment/${itemIndex}`;

  const response = await this.httpService.get(itemUrl).toPromise();
  const item: ItemDTO = response.data;

  const itemExistsInCharacter = character.itens.some(item => item.index === itemIndex);
  if (!itemExistsInCharacter) {
    character.itens.push(item);
    await character.save();
  }

  return character;
}

}

