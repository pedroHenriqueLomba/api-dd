// src/controllers/character.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CharacterService } from '../services/character.service';
import { CharacterDTO } from '../dto/character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getAllCharacters(): Promise<CharacterDTO[]> {
    return this.characterService.getAllCharacters();
  }

  @Get(':id')
  getCharacterById(@Param('id') id: string): Promise<CharacterDTO> {
    return this.characterService.getCharacterById(id);
  }

  @Post()
  async createCharacter(
    @Body() body: { name: string; raceIndex: string; classIndex: string },
  ): Promise<CharacterDTO> {
    const { name, raceIndex, classIndex } = body;
    return await this.characterService.createCharacter(
      name,
      raceIndex,
      classIndex,
    );
  }

  @Delete(':id')
  deleteCharacter(@Param('id') id: string): Promise<void> {
    return this.characterService.deleteCharacter(id);
  }
}
