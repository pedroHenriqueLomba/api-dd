import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterDTO } from 'src/dto/character.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllCharacters(@Req() request): Promise<CharacterDTO[]> {
    console.log(request.user);
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

  @Post(':id/spells/:spellIndex')
  async addSpell(
    @Param('id') id: string,
    @Param('spellIndex') spellIndex: string
  ) {
    return this.characterService.addSpell(id, spellIndex);
  }
}
