import { AbilityBonusDTO } from './ability-bonus.dto';
import { LanguageDTO } from './language.dto';
import { TraitDTO } from './trait.dto';

export class RaceDTO {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: AbilityBonusDTO[];
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: any[];
  languages: LanguageDTO[];
  language_desc: string;
  traits: TraitDTO[];
  subraces: any[];
  url: string;
}
