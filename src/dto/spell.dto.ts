export class SpellDTO {
    higher_level: string[];
    index: string;
    name: string;
    desc: string[];
    range: string;
    components: string[];
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    level: number;
    school: {
      index: string;
      name: string;
      url: string;
    };
    classes: {
      index: string;
      name: string;
      url: string;
    }[];
    subclasses: any[];
    url: string;
  }
  