import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClassDTO } from '../dto/class.dto';
import { RaceDTO } from '../dto/race.dto';

@Injectable()
export class ApiDdHelper {
  constructor(private readonly httpService: HttpService) {}

  async getClassByIndex(index: string): Promise<ClassDTO> {
    const response = await this.httpService
      .get(`https://www.dnd5eapi.co/api/classes/${index}`)
      .toPromise();
    return response.data;
  }

  async getRaceByIndex(index: string): Promise<RaceDTO> {
    const response = await this.httpService
      .get(`https://www.dnd5eapi.co/api/races/${index}`)
      .toPromise();
    return response.data;
  }
}
