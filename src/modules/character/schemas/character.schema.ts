import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClassDTO } from 'src/dto/class.dto';
import { RaceDTO } from 'src/dto/race.dto';
import { SpellDTO } from 'src/dto/spell.dto';
import { ItemDTO } from 'src/dto/item.dto'

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  race: RaceDTO;

  @Prop({ type: Object, required: true })
  class: ClassDTO;

  @Prop({ required: true })
  level: number;

  @Prop({ type: [Object], default: [] }) 
  spells: SpellDTO[];

  @Prop({ type: [Object], default: [] })
  itens: ItemDTO[];
}

 

export const CharacterSchema = SchemaFactory.createForClass(Character);
