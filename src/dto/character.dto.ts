import { ClassDTO } from './class.dto';
import { RaceDTO } from './race.dto';

export class CharacterDTO {
  id: string;
  name: string;
  race: RaceDTO;
  class: ClassDTO;
  level: number;
  spells: any[];
  itens: any[];
}
