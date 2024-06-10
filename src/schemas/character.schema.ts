// src/schemas/character.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClassDTO } from '../dto/class.dto';
import { RaceDTO } from '../dto/race.dto';

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
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
