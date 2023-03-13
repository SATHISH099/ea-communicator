declare interface Session {
  userId?: number;
  count: number;
}

export interface Query {
  orderBy?: string;
  orderType?: string;
  pageNumber?: string;
  pageSize?: string;
  search?: string;
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
