declare interface Session {
  userId?: number;
  count: number;
}

export interface FindTypes {
  one: 'one';
  many: 'many';
  both: 'both';
}
export type FindType = keyof FindTypes;

export interface InputFile {
  name: string;
  data: Buffer;
  mimeType: string;
  extension: string;
}
